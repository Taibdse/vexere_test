import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import HomePage from './pages/HomePage';
import GlobalContext from './context';


function App() {
  return (
   <GlobalContext>
     <HomePage/>
   </GlobalContext>
  );
}

export default App;
