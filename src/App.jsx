import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Routes from './components/Routes';
import { useAuth0 } from './utils/react-auth0-spa';

export default function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div className='loader'>Loading...</div>;
  }

  return (
    <Router>
      <NavBar />
      <Routes />
    </Router>
  );
}
