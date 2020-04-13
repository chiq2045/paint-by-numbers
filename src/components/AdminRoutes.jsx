import React from 'react';
import {
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';
import Assignments from '../views/admin/Assignments';
import Assignment from '../views/admin/Assignment';
import Dashboard from '../views/admin/Dashboard';
import Images from '../views/admin/Images';
import Image from '../views/admin/Image';
import Legend from '../views/admin/Legend';

export default function AdminRoutes() {
  const { path } = useRouteMatch();
  const { id } = useParams();

  return (
    <Switch>
      <Route
        path={`${path}/assignments`}
        component={Assignments}
      />
      <Route path={`${path}/assignments/:${id}`}>
        <Assignment id={id} />
      </Route>
      <Route
        exact
        path={path}
        component={Dashboard}
      />
      <Route
        path={`${path}/images`}
        component={Images}
      />
      <Route path={`${path}/images/:${id}`}>
        <Image id={id} />
      </Route>
      <Route
        path={`${path}/legend`}
        component={Legend}
      />
    </Switch>
  );
}
