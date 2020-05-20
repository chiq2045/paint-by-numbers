/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../../utils/react-auth0-spa';

export default function EditImage(props) {
  const { images, loaded } = props;
  const [currentFill, setCurrentFill] = useState('');
  // const [svgPaths, setSvgPaths] = useState([]);
  const { getTokenSilently } = useAuth0();
  // const [svg, setSvg] = useState([]);
  // const [found, setFound] = useState(false);
  const { id } = useParams();

  // const findImage = () => {
  //   const foundImage = images.find(image => {
  //     image.id == parseInt(id);
  //   });
  //   if (foundImage) {
  //     setFound(true);
  //     setSvg(foundImage);
  //   };
  // }
  const handleChangeColor = pathId => {
    const tempSvgPaths = svgPaths;
    tempSvgPaths[pathId-1].fill = color;
    setSvgPaths(tempSvgPaths);
    document.getElementById(pathId).setAttribute('fill', 'black');
  };
  const handleMouseOver = pathId => {
    setCurrentFill(document.getElementById(pathId).getAttribute('fill'));
    document.getElementById(pathId).setAttribute('fill', 'lightgray');
  };
  const handleMouseOut = pathId => {
    document.getElementById(pathId).setAttribute('fill', currentFill);
  };

  const RenderSvg = () => {
    const svg = images[parseInt(id-1)];
    const svgData = JSON.parse(svg.value);
    const { height, width } = svgData[0];
    const paths = [];
    const svgPaths = svgData.slice()
    // setSvgPaths(svgData.slice(1));
    svgPaths.forEach(path => {
      paths.push(<path 
        key={`path-${path.id}`}
        id={path.id}
        d={path.d}
        fill={path.fill}
        stroke={path.stroke}
        fillRule={path.fillRule}
        onMouseOut={() => handleMouseOut(path.id)}
        onMouseOver={() => handleMouseOver(path.id)}
        onClick={() => handleChangeColor(path.id)}
      />,)
    });
    return (
      <svg
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
        'Access-Control-Allow-Origin': 'https://api.ogamba.com'
      }
    });
    const svg = images[id-1];
    const config = svg.value[0];
    const data = [];
    data.push(config);
    svgPaths.forEach(path => {
      data.push(path);
    });
    await instance.put(`/update/${id}`, data);
  };
  return (
    <div>
      <div className='content'>
        <div className='row'>
          <div className='col-4'>
            <button className='btn-light' onClick={() => handleClearChanges}>Clear Changes</button>
          </div>
          <div className='col-4'>
            <button className='btn-light' onClick={() => handleSaveChanges}>Save Changes</button>
          </div>
          <div className='col-4'>
            <button className='btn-light'>Add to Assignment</button>
          </div>
        </div>
      </div>
      <div className='content'>
        {
          loaded
            ? (
              <object>
                <RenderSvg />
              </object>
            ) : <div className='loader'>Loading...</div>
        }
      </div>
    </div>
  );
}
