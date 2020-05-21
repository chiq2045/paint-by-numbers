import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '../../utils/react-auth0-spa';
import AdminAssignments from '../../views/assignments/AdminAssignments';

export default function ImageRoutes() {
  const [images, setImages] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { getTokenSilently } = useAuth0();
  const { path } = useRouteMatch();

  useEffect(() => {
    fetchData();
    if (error) console.error(error);
    // eslint-disable-next-line
  }, []);

  const fetchData = async() => {
    try {
      const token = await getTokenSilently();
      const instance = axios.create({
        baseURL: 'https://api.ogamba.com/paint/private',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': 'https://api.ogamba.com'
        }
      });
      const imageResults = await instance('/svgs');
      const assignmentResults = await instance('/assinments');
      setImages(imageResults.data);
      setAssignments(assignmentResults.data);
      setLoaded(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <Switch>
        <Route exact path={`${path}`}>
          <AdminAssignments images={images} loaded={loaded} assignments={assignments} />
        </Route>
      </Switch>
    </div>
  );
}

