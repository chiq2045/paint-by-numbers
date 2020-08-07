/* eslint-disable react/prop-types */
import React from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';

export default function Assignments(props) {
  const { images, loaded, assignemnts } = props;
  const { path: routePath } = useRouteMatch();

  const RenderAdminView = () => {
    return (
      <div>
        <div className='content'>
          <div className='row u-text-center'>
            <div className='col-6'>
              <Link to={`${routePath}/create`}>Create Assignment</Link>
            </div>
            <div className='col-6'>
              <Link to={`${routePath}/delete/all`}>Delete All Assignments</Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='content'>
      <p>This is where you can find the assignments</p>
      <p>However, it is not yet built</p>
    </div>
  )
}
