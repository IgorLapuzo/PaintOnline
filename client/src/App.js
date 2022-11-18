import React from 'react';
import SettingBar from './components/SettingBar';
import ToolBar from './components/ToolBar';
import Canvas from './components/Canvas';
import './styles/app.scss';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
      <Routes>
        <Route path='/:id' element={
          <>
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
          </>} 
        />
        <Route path='/' element={
          <>
            <ToolBar/>
            <SettingBar/>
            <Canvas/>
            <Navigate to={`/f${(+new Date()).toString(16)}`} replace/>
          </>} 
        />
      </Routes>
    </div>
    </BrowserRouter>
    
  );
}

export default App;


