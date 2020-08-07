import React, { useState } from 'react';
import ColorService from '../components/general/ColorService';

export default function Legend() {
  const [color, setColor] = useState('');
  const handleKeyPress = e => {
    console.log(e.target.value);
    setColor(e.target.value);
  }
  return (
    <div className='content'>
      <div className='section'>
        <h4>Legend</h4>
        <p>Choose the colors available to use in the color picker</p>
      </div>
      <div className='section'>
        <div className='row'>
          <div className='col-9'>
            <input type='text' value={color} onChange={handleKeyPress} />
          </div>
          <div className='col-3'>
            <button className='btn-dark' onClick={() => ColorService({color: color})}>
              Find Color
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
