/* eslint-disable react/prop-types */
import React from 'react';
import {
  Link,
  useRouteMatch
} from 'react-router-dom';

export default function Assignments(props) {
  const { images, loaded, assignemnts } = props;
  const { path: routePath } = useRouteMatch();

  const RenderHeader = () => {
    return (
      <div className='section'>
        <div className='row u-text-center'>
          <div className='col-6'>
            <Link to={`${routePath}/create`}>Create Assignment</Link>
          </div>
          <div className='col-6'>
            <Link to={`${routePath}/delete/all`}>Delete All Assignments</Link>
          </div>
        </div>
      </div>
    );
  };

  const AssignmentTiles = () => {
    const tiles = [];
    assignemnts.forEach(assignment => {
      tiles.push(
        <div className='tile'>
          <div className='tile-container'>
            <p className='tile__title u-no-margin'>{assignment.name}</p>
            <p className='title__subtitle u-no-margin'>{assignment.dateDue}</p>
            <span className='info'>{assignment.images}</span>
            <p className='tile__buttons u-no-margin'>
              <button className='btn-light btn-tiny'>Edit</button>
              <button className='btn-light btn-tiny'>Delete</button>
            </p>
          </div>
        </div>,
      );
    });
    return tiles;
  }
  const RenderAssignments = () => {
    return (
      <div className='section'>
        {(loaded && Array.isArray(assignemnts) && assignemnts.length > 0) && <AssignmentTiles />}
      </div>
    )
  }

  return (
    <div className='content'>
      <RenderHeader />
      <RenderAssignments />
    </div>
  )
}
