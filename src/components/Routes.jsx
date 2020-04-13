import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import Login from '../views/Login';
import NavBar from './NavBar';
import Logout from '../views/Logout';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

export default function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path='/'
          component={Login}
        />
        <Route path='/user'>
          <NavBar isAdmin={false} />
          <UserRoutes />
        </Route>
        <Route path='/admin'>
          <NavBar isAdmin={true} />
          <AdminRoutes />
        </Route>
        <Route path='/logout' component={Logout} />
      </Switch>
    </div>
  );
}
