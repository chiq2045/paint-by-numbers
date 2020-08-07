/* eslint-disable react/prop-types */
import React from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';

export default function Images(props) {
  const { images, loaded } = props;
  const { path: routePath } = useRouteMatch();

  const renderSvg = (svgName, svgPaths) => {
    const paths = [];
    // eslint-disable-next-line
    svgPaths.forEach(path => {
      paths.push(<path 
        key={path.id}
        id={`${svgName}-${path.id}`}
        d={path.d}
        fill={path.fill}
        stroke={path.stroke}
        fillRule={path.fillRule}
      />,)
    });
    return paths;
  };

  /**
   * @description Retruns a card with an svg as the image
   * @param {Array} cardData the data for the svg
   * @returns (
   *  <div className='card'>
   *    <div className='card-container'>
   *      <svg />
   *    </div>
   *  </div
   * )
   */
  const renderCard = svgData => {
    const svgName = svgData.name;
    const svg = svgData.value;
    const id = svgData.id;
    const { width, height } = svg[0];
    const svgPaths = svg.slice(1);
    
    return (
      <div className='card u-flex, u-flex-column h-100'>
        <div className='card-container'>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio='xMidYMin meet'
            height='100%'
          >
            {renderSvg(svgName, svgPaths)}
          </svg>
          <div className='title-container'>
            <p className='title' style={{color: 'black'}}>{svgName}</p>
          </div>
        </div>
        <div className='action-bar u-center'>
          <div className='btn-group'>
            <Link to={`${routePath}/edit/${id}`}>
              <button className='btn-clear'>Edit</button>
            </Link>
            <Link to={`${routePath}/delete/${id}`}>
              <button className='btn-clear'>Delete</button>
            </Link>
          </div>
          <button className='btn-clear'>Add to Assignment</button>
        </div>
      </div>
    );
  };
  
  /**
   * @description Retruns a row of up to 3 cards
   * @param {Array} rowData an array of max 3 images
   * @returns {Array}
   */
  const renderRowOfCards = rowData => {
    const rowOfCards = [];
    rowData.forEach(card => {
      rowOfCards.push(
        <div className='col-4' key={card.id}>
          {renderCard(card)}
        </div>,
      );
    });
    return rowOfCards;
  };

  const RenderAllCards = () => {
    const rowsOfCards = [];
    const range = { beginning: 0, end: 3 };
    while (range.beginning < images.length) {
      const rowData = images.slice(range.beginning, range.end);
      rowsOfCards.push(
        <div className='row' key={range.end/3}>
          {renderRowOfCards(rowData)}
        </div>,
      );
      range.beginning = range.end;
      range.end += 3;
    } 
    return rowsOfCards;
  };

  return (
    <div>
      <div className='content'>
        <div className='row u-text-center'>
          <div className='col-6'>
            <Link to={`${routePath}/upload`}>Upload Image</Link>
          </div>
          <div className='col-6'>
            <Link to={`${routePath}/delete/all`}>Delete All</Link>
          </div>
        </div>
      </div>
      <div className='content'>
        {loaded && <RenderAllCards />}
        {!loaded && <div className='loader'>Loading...</div>}
      </div>
    </div>
  );
}
