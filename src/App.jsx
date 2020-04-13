import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './views/Login';
import NavBar from './components/NavBar';
import UserDashBoard from './views/user/Dashboard';
import AdminDashboard from './views/admin/Dashboard';
import Logout from './views/Logout';

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            component={Login}
          />
          <Route path='/user'>
            <NavBar isAdmin={false} />
            <UserDashBoard />
          </Route>
          <Route path='/admin'>
            <NavBar isAdmin={true} />
            <AdminDashboard />
          </Route>
          <Route path='/logout' component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}
