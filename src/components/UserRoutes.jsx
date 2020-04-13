import React from 'react';
import {
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import Assignments from '../views/user/Assignments';
import Assignment from '../views/user/Assignment';
import Dashboard from '../views/user/Dashboard';

export default function AdminRoutes() {
  const { path } = useRouteMatch();
  const { id } = useParams();

  return (
    <Switch>
      <Route
        to={`${path}/assignments`}
        component={Assignments}
      />
      <Route to={`${path}/assignments/:${id}`}>
        <Assignment id={id} />
      </Route>
      <Route
        to={`${path}`}
        component={Dashboard}
      />
    </Switch>
  );
}
