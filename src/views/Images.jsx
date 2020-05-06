import React, { useState, useEffect } from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../utils/react-auth0-spa';

export default function Images() {
  const [images, setImages] = useState([]);
  const { path } = useRouteMatch();
  const { getTokenSilently } = useAuth0();

  const fetchImages = async() => {
    try {
      const token = await getTokenSilently();
      const instance = axios.create({
        baseURL: 'https://api.ogamba.com/paint/private',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await instance('/svgs');
      setImages(result);
      console.log(images);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchImages();
  });

  const renderCard = () => {
    const path = images[3].value[0];
    return (
      <div className='card'>
        <div className='card-container'>
          <svg>
            {
              <path id={path.id} d={path.d} fill={path.fill} stroke={path.stroke} fillRule={path.fillRule} />
            }
          </svg>
          <div className='title-container'>
            <p className='title'>{images[3].name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className='content'>
        <Link to={`${path}upload`}>Upload Image</Link>
      </div>
      <div className='content'>
        {renderCard}
      </div>
    </div>
  );
}
