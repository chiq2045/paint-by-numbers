import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='hero fullscreen'>
      <div className='content u-center'>
        <div className='row u-text-center'>
          <h4>Login</h4>
        </div>
        <div className='row'>
          <div className='btn-group'>
            <Link to='/user'>
              <button className='btn-dark'>Login as User</button>
            </Link>
            <Link to='/admin'>
              <button className='btn-dark'>Login as Admin</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
