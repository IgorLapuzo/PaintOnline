import React from 'react';
import '../styles/toolBar.scss';
import canvasState from '../store/canvasState';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Eraser from '../tools/Eraser';

const ToolBar = () => {

  const changeColor = e => {
    toolState.setStrokeColor(e.target.value)
    toolState.setFillColor(e.target.value)
  }

  return (
    <div className='toolBar'>
      <button className='toolBar__btn brush' onClick={() => toolState.setTool(new Brush(canvasState.canvas))}/>
      <button className='toolBar__btn rect' onClick={() => toolState.setTool(new Rect(canvasState.canvas))}/>
      <button className='toolBar__btn circle'/>
      <button className='toolBar__btn eraser' onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}/>
      <button className='toolBar__btn line'/>
      <input onChange={e => changeColor(e)} style={{marginLeft:10}} type='color'/>
      <button className='toolBar__btn undo' onClick={() => canvasState.undo()}/>
      <button className='toolBar__btn redo' onClick={() => canvasState.redo()}/>
      <button className='toolBar__btn save'/>
    </div>
  );
}

export default ToolBar;