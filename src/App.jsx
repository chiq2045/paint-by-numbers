import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { createBrowserHistory as history } from 'history';

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className='content'>
        <Routes />
      </div>
    </Router>
  );
}
