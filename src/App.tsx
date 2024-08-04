import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import MainPage from './components/MainPage';
import {  Router, Route, Routes, Navigate } from 'react-router-dom';
import MakeNewClient from './components/MakeNewClient';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [User, setUser] = useState<string>('');

  return (
   
      <div className="App">
        <Routes>
          <Route path="/" element={<Login setLogin={setIsLoggedIn} setNewUser={setUser} />} />
          <Route path="/main" element={isLoggedIn ? <MainPage Username={User} setLogout={setIsLoggedIn} /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
   
  );
}

export default App;
