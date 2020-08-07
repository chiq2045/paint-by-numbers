/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../utils/react-auth0-spa';
import axiosConfig from '../utils/axiosConfig';
import RenderCard from '../components/images/RenderCard';

export default function Images(props) {
  const { setImageId } = props;
  const { path: routePath } = useRouteMatch();
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    !loaded && fetchAllImages();
  }, [loaded]);

  /**
   * @description fetches all images from the backend server
   */
  const fetchAllImages = async () => {
    const token = await getTokenSilently();
    const instance = axios.create(axiosConfig(token, 'GET'));
    await instance({
      method: 'get',
      url: 'svgs'
    })
      .then(response => {
        const { data } = response;
        setImages(data.results);
        setLoaded(data.success);
      })
      .catch(err => {
        if (setError) setError(error => [...error, err])
      });
  }

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
          {RenderCard({svg: card, path: routePath, setImageId: setImageId})}
        </div>,
      );
    });
    return rowOfCards;
  };

  /**
   * @description Returns all the cards in rows of three
   * @returns {Array}
   */
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
