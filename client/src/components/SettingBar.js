import React from 'react';
import toolState from '../store/toolState';

const SettingBar = () => {
  return (
    <div className='settingBar'>
      <label style={{margin: '0 10px'}} htmlFor='line-width'>Line width</label>
      <input 
        onChange={e => toolState.setLineWidth(e.target.value)}
        id='line-width' 
        type='number' 
        defaultValue={1} 
        min={1} 
        max={20}
      >
      </input>
      <label style={{margin: '0 10px'}} htmlFor='stroke-color'>Stroke color</label>
      <input 
        onChange={e => toolState.setStrokeColor(e.target.value)} 
        id='stroke-color'
        type='color'
      >
      </input>
    </div>
  );
}

export default SettingBar;