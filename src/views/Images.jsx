import React, { useState, useEffect } from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../utils/react-auth0-spa';
import imageExtensions from './images/imageExtensions';

export default function Images() {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { path } = useRouteMatch();
  const { getTokenSilently } = useAuth0();

  const fetchImages = async() => {
    try {
      const token = await getTokenSilently();
      const instance = axios.create({
        baseURL: 'https://api.ogamba.com/paint/private',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'https://api.ogamba.com'
        }
      });
      const result = await instance('/svgs');
      setImages(result.data);
      setLoaded(true);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchImages();
    if (error) console.error(error);
    // eslint-disable-next-line
  }, []);

  const stripName = name => {
    let returnName = name;
    imageExtensions.forEach(extension => {
      returnName = returnName.replace(extension, '');
    });
    return returnName;
  }
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
    const svgName = stripName(svgData.name);
    const svg = JSON.parse(svgData.value);
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
            <Link to={`${path}edit/${id}`}>
              <button className='btn-clear'>Edit</button>
            </Link>
            <Link to={`${path}delete/${id}`}>
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
            <Link to={`${path}upload`}>Upload Image</Link>
          </div>
          <div className='col-6'>
            <Link to={`${path}delete`}>Delete All</Link>
          </div>
        </div>
      </div>
      <div className='content'>
        {loaded && <RenderAllCards />}
      </div>
    </div>
  );
}
