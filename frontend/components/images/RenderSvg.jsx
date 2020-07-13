import React, { useState, useEffect } from 'react';

/**
 * @description returns an svg object from an object with an array of paths
 * @params {object} svg - on object with an id, name and array of paths
 */
export default function RenderSvg(props) {
  const { svg } = props;
  const [paths, setPaths] = useState([]);
  const config = svg.value[0];
  const svgPaths = svg.value.slice(1)
  
  useEffect(() => {
    svgPaths.forEach(path => {
      setPaths(paths => [...paths, (<path
        key={path.id}
        id={`${svg.name}-${path.id}`}
        d={path.d}
        fill={path.fill}
        stroke={path.stroke}
        fillRule={path.fillRule}
      />)]);
    });
  }, [svg]);
  
  return (
    <svg
      viewBox={`0 0 ${config.width} ${config.height}`}
      preserveAspectRatio='xMidYMin meet'
      height='100%'
      width='100%'
    >
      {paths}
    </svg>
  );
}
