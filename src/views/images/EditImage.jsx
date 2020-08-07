/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import axiosConfig from '../../utils/axiosConfig';
import ColorPicker from '../../components/images/ColorPicker';
import colors from '../../components/general/colors';
import { useAuth0 } from '../../utils/react-auth0-spa';

export default function EditImage(props) {
  const { images, loaded } = props;
  const [fillColor, setFillColor] = useState('');
  const [readyToRender, setReadyToRender] = useState(false);
  const [svg, setSvg] = useState({});
  const [svgData, setSvgData] = useState({ config: {}, paths: [] });
  const [strokeDasharray, setStrokeDasharray] = useState([]);
  const { id } = useParams();
  const { getTokenSilently } = useAuth0();

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

  const handleChangePathFill = pathId => {
    const { paths, config } = svgData;
    paths[pathId-1].fill = fillColor;
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
    setSvgData({ config: svg.value[0], paths: svg.value.slice(1) });
  };

  const handleSaveChanges = async() => {
    const token = await getTokenSilently();
    const instance = axios.create(axiosConfig(token, 'PUT'));
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
      data: updateData,
      responseType: 'json'
    })
      .then(response => {
        console.log(response.data);
        console.log(response.status);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className='content'>
        <div className='row'>
          <div className='col-4'>
            <button
              className='btn-light'
              onClick={() => {handleClearChanges}}
            >
              Clear Changes
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
        </div>
      </div>
      <div className='content'>
        <div className='row'>
          <div className='col-3'>
            <div className='section'>
              <ColorPicker colors={colors} setFillColor={setFillColor} />
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
