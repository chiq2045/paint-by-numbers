/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EditImage(props) {
  const { images, loaded } = props;
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
    document.getElementById(pathId).setAttribute('fill', 'black');
  }

  const RenderSvg = () => {
    const svg = images[parseInt(id-1)];
    const svgData = JSON.parse(svg.value);
    const { height, width } = svgData[0];
    const svgPaths = svgData.slice(1);
    const paths = [];
    // eslint-disable-next-line
    svgPaths.forEach(path => {
      paths.push(<path 
        key={`path-${path.id}`}
        id={path.id}
        d={path.d}
        fill={path.fill}
        stroke={path.stroke}
        fillRule={path.fillRule}
        // onClick={handleChangeColor(path.id)}
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

  return (
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
  );
}
