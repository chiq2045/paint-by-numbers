import React from 'react';
import { Link } from 'react-router-dom';

export default function Logout() {
  return (
    <div className='hero fullscreen'>
      <div className='u-center'>
        <div className='row'>
          <h6>You are now logged out</h6>
        </div>
        <Link to='/' className='row'>
          <button className='btn-dark'>Back to Login</button>
        </Link>
      </div>
    </div>
  );
}
