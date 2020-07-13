import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../../utils/react-auth0-spa';
import Images from '../../views/Images';
import UploadImage from '../../views/images/UploadImage';
import EditImage from '../../views/images/EditImage';
import DeleteAll from '../../views/images/DeleteAll';
import axiosConfig from '../../utils/axiosConfig';

export default function ImageRoutes() {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState([]);

  const { getTokenSilently } = useAuth0();
  const { path } = useRouteMatch();

  useEffect(() => {
    !loaded && fetchImages();
    if (Array.isArray(error) && error.length > 0)
      console.error(error);
  }, [loaded, error]);

  const fetchImages = async() => {
    const token = await getTokenSilently();
    const instance = axios.create(axiosConfig(token, 'GET'));
    await instance({
      method: 'get',
      url: '/svgs'
    })
      .then(response => {
        const { data } = response;
        data.success ? setImages(data.results) : setError(error => [...error, data.error]);
        setLoaded(data.success);
      })
      .catch(error => setError(error));
  };

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`}>
          <Images images={images} loaded={loaded} />
        </Route>
        <Route path={`${path}/upload`} component={UploadImage} />
        <Route path={`${path}/edit/:id`}>
          <EditImage images={images} loaded={loaded} setLoaded={setLoaded} />
        </Route>
        <Route path={`${path}/delete/all`}>
          <DeleteAll path={path} />
        </Route>
      </Switch>
    </div>
  );
}