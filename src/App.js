import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import Profile from './Pages/Profile.js';
import { AnimatePresence } from 'framer-motion';

function App() {

  return (
    <div className="container">
      <AnimatePresence exitBeforeEnter={false} mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
