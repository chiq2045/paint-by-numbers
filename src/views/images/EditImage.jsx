/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CirclePicker from './ColorPicker';
import axios from 'axios';
import { useAuth0 } from '../../utils/react-auth0-spa';

export default function EditImage(props) {
  const { images, loaded } = props;
  const [color, setColor] = useState({ color: 'black', pathId: 0});
  const [changeColor, setChangeColor] = useState(false);
  // const [borders, setBorders] = useState(false);
  // const [currentFill, setCurrentFill] = useState('');
  // const [svgPaths, setSvgPaths] = useState([]);
  const { getTokenSilently } = useAuth0();
  const [readyToRender, setReadyToRender] = useState(false);
  const [svg, setSvg] = useState({});
  const [svgData, setSvgData] = useState({ config: {}, paths: [] });
  const [strokeDasharray, setStrokeDasharray] = useState([]);
  // const [found, setFound] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (loaded)
      setSvg(images[parseInt(id-1)]);
  }, [loaded]);

  useEffect(() => {
    if (svg.value) {
      setSvgData({
        config: svg.value[0],
        paths: svg.value.slice(1)
      });
      setReadyToRender(true);
    }
  }, [svg]);

  // useEffect(() => {
  //   if (svgData.paths.length > 0) {
  //     // const pathsArray = svgData.paths;
  //     // pathsArray.forEach(path => {
  //     //   setStrokeDasharray(strokeDasharray => [...strokeDasharray, '']);
  //     // });
  //   }
  // }, [svgData]);

  // useEffect(() => {
  //   setChangeColor(false);
  // }, [changeColor]);

  const handleChangePathFill = pathId => {
    const { paths, config } = svgData;
    paths[pathId-1].fill = color.color;
    setSvgData({ paths: paths, config: config });
  };

  const handleMouseOver = pathId => {
    const dashArray = strokeDasharray;
    dashArray[pathId-1] = 4;
    setStrokeDasharray(dashArray);
  };

  const handleMouseOut = pathId => {
    const dashArray = strokeDasharray;
    dashArray[pathId-1] = '';
    setStrokeDasharray(dashArray);
  };

  const RenderSvg = () => {
    const { height, width } = svgData.config;
    const paths = [];
    const svgPathsArray = svgData.paths;
    // setSvgPaths(svgData.slice(1));
    svgPathsArray.forEach(path => {
      const pathId = path.id;
      paths.push(<path 
        key={`path-${pathId}`}
        id={pathId}
        d={path.d}
        fill={path.fill}
        stroke={path.stroke}
        fillRule={path.fillRule}
        onMouseOut={() => handleMouseOut(pathId)}
        onMouseOver={() => handleMouseOver(pathId)}
        strokeDasharray={strokeDasharray[pathId-1]}
        onClick={() => handleChangePathFill(pathId)}
      />,)
    });

    return (
      <svg
        id='svg'
        name={svg.name}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='xMidYMin meet'
        height='100%'
      >
        {paths}
      </svg>
    );
  };

  const handleClearChanges = () => {
    setSvgPaths(JSON.parse(images[parseInt(id-1)].value.slice(1)));
  };

  const handleSaveChanges = async() => {
    const token = await getTokenSilently();
    const instance = axios.create({
      baseURL: 'https://api.ogamba.com/paint/private',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'https://api.ogamba.com',
        'Access-Control-Allow-Methods': 'PUT',
        Credentials: true
      }
    });
    const updateData = svg;
    const svgArray = [];
    svgArray.push(svgData.config);
    svgData.paths.forEach(path => {
      svgArray.push(path);
    });
    updateData.value = svgArray;
    await instance({
      method: 'put',
      url: `/svgs/update/${id}`,
      data: updateData
    })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleColorPickerChange = (color, e) => {
    setColor(color);
    setChangeColor(true);
  }

  return (
    <div>
      <div className='content'>
        <div className='row'>
          <div className='col-4'>
            <button
              className='btn-light'
              onClick={() => {loadImage}}
            >
              Load Image
            </button>
          </div>
          <div className='col-4'>
            <button
              className='btn-light'
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
          <div className='col-4'>
            <button className='btn-light'>Download</button>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='row'>
          <div className='col-3'>
            <div className='section'>
              <CirclePicker />
            </div>
          </div>
          <div className='col-9'>
            {
              readyToRender
                ? (
                  <object>
                    <RenderSvg />
                  </object>
                ) : <div className='loader'>Loading...</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
