import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
// import Login from '../views/Login';
// import Logout from '../views/Logout';
// import AdminRoutes from './AdminRoutes';
import Dashboard from '../views/Dashboard';
import UploadImage from '../views/UploadImage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          component={Dashboard}
        />
        <Route
          path='/admin/upload'
          component={UploadImage}
        />
      </Switch>
    </div>
  );
}
