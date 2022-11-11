import React from 'react';
import '../styles/toolBar.scss'

const ToolBar = () => {
  return (
    <div className='toolBar'>
      <button className='toolBar__btn brush'/>
      <button className='toolBar__btn rect'/>
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