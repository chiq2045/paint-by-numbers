/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '../utils/react-auth0-spa';

export default function Navbar() {
  const {
    isAuthenticated,
    logout
  } = useAuth0();

  return (
    <div className='header header-fill unselectable header-animated header-dark'>
      <div className='header-brand'>
        <Link className='nav-item no-hover u u-LR' to='/'>
          <h6 className='title'>PaintByNumbers</h6>
        </Link>
        <div className='nav-item nav-btn' id='header-btn'>
          <span />
          <span />
          <span />
        </div>
      </div>
      {!isAuthenticated
        ? (
          <div className='header-nav' id='header-menu'>
            <div className='nav-left'>
              <div className='nav-item text-center'>
                <Link className='u u-LR' to='/assignments'>View Assignments</Link>
              </div>
            </div>
            <div className='nav-right'>
              <div className='nav-item text-center'>
                <Link className='u u-RL' to='/login'>Login as Admin</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className='header-nav' id='header-menu'>
            <div className='nav-left'>
              <div className='nav-item text-center'>
                <Link className='u u-LR' to='/admin/assignments'>Manage Assignments</Link>
              </div>
              <div className='nav-item text-center'>
                <Link className='u u-LR' to='/admin/images'>Manage Images</Link>
              </div>
            </div>
            <div className='nav-right'>
              <div className='nav-item text-center'>
                <a className='u u-LR' onClick={() => logout()}>Logout</a>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
