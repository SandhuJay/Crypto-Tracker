// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from './pages/HomePage';
import CryptoConverter from './pages/CryptoConverter';
import CryptoNews from './pages/CryptoNews';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">CryptoTracker</Link>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-blue-400">Home</Link>
              <Link to="/converter" className="hover:text-blue-400">Converter</Link>
              <Link to="/crypto-news" className="text-white hover:underline">Crypto News</Link> 
            </div>
          </div>
        </nav>
       
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/converter" element={<CryptoConverter />} />
          <Route path="/crypto-news" element={<CryptoNews />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
