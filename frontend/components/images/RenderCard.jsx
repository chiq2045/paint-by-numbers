import React from 'react';
import { Link } from 'react-router-dom';
import RenderSvg from './RenderSvg';

/**
 * @description Retruns a card with an svg as the image
 * @param {object} svg - data for the svg
 * @param {string} routePath - the current path (necessary for routing)
 */
export default function RenderCard(props) {
  const { svg, path, setImageId } = props;
  const { name, id } = svg;
  const color = 'black';

  return (
    <div className='card u-flex u-flex-column h-100'>
      <div className='card-container'>
        <RenderSvg svg={svg} />
        <div className='title-container'>
          <p className='title' style={{color: color}}>{name}</p>
        </div>
      </div>
      <div className='action-bar u-center'>
        {path
          ? (
            <div className='btn-group'>
              <Link to={`${path}/edit/${id}`}>
                <button className='btn-clear' onClick={() => setImageId(id)}>Edit</button>
              </Link>
              <Link to={`${path}/delete/${id}`} onClick={() => setImageId(id)}>
                <button className='btn-clear'>Delete</button>
              </Link>
            </div>
          ) : (
            <button className='btn-clear' onClick={addToAssignment}>Add to Assignment</button>
          )
        }
      </div>
    </div>
  );
}
