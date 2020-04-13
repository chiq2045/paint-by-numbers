import React from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';
import PropTypes from 'prop-types';

export default function NavBar(props) {
  const { isAdmin } = props;
  const { url } = useRouteMatch();

  return (
    <div className='header header-fill unselectable header-animated header-dark'>
      <div className='header-brand'>
        <Link className='nav-item no-hover u u-LR' to={`${url}`}>
          <h6 className='title'>PaintByNumbers</h6>
        </Link>
        <div className='nav-item nav-btn' id='header-btn'>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className='header-nav' id='header-menu'>
        <div className='nav-left'>
          <div className='nav-item text-center'>
            <Link className='u u-LR' to={`${url}/assignments`}>Assignments</Link>
          </div>
          {isAdmin && (
            <>
              <div className='nav-item text-center'>
                <Link className='u u-LR' to={`${url}/images`}>Images</Link>
              </div>
              <div className='nav-item text-center'>
                <Link className='u u-LR' to={`${url}/legend`}>Legend</Link>
              </div>
            </>
          )}
        </div>
        <div className='nav-right'>
          <div className='nav-item text-center'>
            <Link className='u u-LR' to='/logout'>Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  isAdmin: PropTypes.bool
};
