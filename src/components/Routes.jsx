import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Login from './Login';
import Dashboard from '../views/Dashboard';
import ImageRoutes from './images/ImageRoutes';
import PrivateRoute from './PrivateRoute';
import AdminAssignmentRoutes from './assignments/AdminAssignmentRoutes';
import AssignmentRoutes from './assignments/AssignmentRoutes';

export default function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          component={Dashboard}
        />
        <PrivateRoute path='/admin/images' component={ImageRoutes} />
        <Route path='/login' component={Login} />
        <Route path='/assignments' component={AssignmentRoutes} />
        <PrivateRoute path='/admin/assignments' component={AdminAssignmentRoutes} />
      </Switch>
    </div>
  );
}
