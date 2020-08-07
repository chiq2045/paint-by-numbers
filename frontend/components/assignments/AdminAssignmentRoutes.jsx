import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../../utils/react-auth0-spa';
import axiosConfig from '../../utils/axiosConfig';
import AdminAssignments from '../../views/assignments/AdminAssignments';
import CreateAssignment from '../../views/assignments/CreateAssignment';

export default function AdminAssignmentRoutes() {
  const [images, setImages] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [assignmentsLoaded, setAssignmentsLoaded] = useState(false);
  const [error, setError] = useState([]);

  const { getTokenSilently } = useAuth0();
  const { path } = useRouteMatch();

  useEffect(() => {
    if (Array.isArray(error) && error.length > 0)
      console.error(error);
  }, [error]);

  useEffect(() => {
    !imagesLoaded && fetchImages();
  }, [imagesLoaded]);
  useEffect(() => {
    !assignmentsLoaded && fetchAssignments();
  }, [assignmentsLoaded]);

  const fetchImages = async() => {
    const token = await getTokenSilently();
    const instance = axios.create(axiosConfig(token, 'GET'));
    await instance({
      method: 'get',
      url: '/svgs'
    })
      .then(response => {
        const { data } = response;
        // data.success ? setImages(data.results) : setError(error => [...error, data.error]);
        setImages(data.results);
        setImagesLoaded(data.success);
      })
      .catch(err => setError(error => [...error, err]));
  };

  const fetchAssignments = async() => {
    const token = await getTokenSilently();
    const instance = axios.create(axiosConfig(token, 'GET'));
    await instance({
      method: 'get',
      url: '/assignments'
    })
      .then(response => {
        const { data } = response;
        // data.success ? setAssignments(data.results) : setError(error => [...error, data.error]);
        setAssignments(data.results);
        setAssignmentsLoaded(data.success);
      })
      .catch(err => setError(error => [...error, err]));
  };

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`}>
          <AdminAssignments images={images} loaded={imagesLoaded && assignmentsLoaded} assignments={assignments} />
        </Route>
        <Route path={`${path}/create`}>
          <CreateAssignment images={images} loaded={assignmentsLoaded && imagesLoaded} assignments={assignments} />
        </Route>
      </Switch>
    </div>
  );
}
