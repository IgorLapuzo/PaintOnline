import React from 'react';
import '../styles/toolBar.scss';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';

const ToolBar = () => {
  return (
    <div className='toolBar'>
      <button className='toolBar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}/>
      <button className='toolBar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}/>
      <button className='toolBar__btn circle'/>
      <button className='toolBar__btn eraser'/>
      <button className='toolBar__btn line'/>
      <input style={{marginLeft:10}} type='color'/>
      <button className='toolBar__btn undo'/>
      <button className='toolBar__btn redo'/>
      <button className='toolBar__btn save'/>
    </div>
  );
}

export default ToolBar;