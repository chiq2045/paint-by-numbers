import React from 'react';

export default function ColorPicker(props) {
  const { colors, setFillColor } = props;

  const RenderPicker = () => {
    const picker = [];

    for (let i = 0; i < Math.ceil(colors.length)/3; i++) {
      picker.push(
        <div className='row' key={i}>
          <div className='col-4'>
            <button style={{backgroundColor: colors[i*3+0]}} onClick={() => setFillColor(colors[i*3+0])} />
          </div>
          <div className='col-4'>
            <button style={{backgroundColor: colors[i*3+1]}} onClick={() => setFillColor(colors[i*3+1])} />
          </div>
          <div className='col-4'>
            <button style={{backgroundColor: colors[i*3+2]}} onClick={() => setFillColor(colors[i*3+2])} />
          </div>
        </div>,
      );
    }
    return picker;
  }
  
  return (
    <div>
      {(Array.isArray(colors) && colors.length > 0)
        ? <RenderPicker />
        : <p>There are no colors in the color picker</p>
      }
    </div>
  )
}
