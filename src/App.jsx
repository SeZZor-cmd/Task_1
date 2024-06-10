import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './assets/Home';
import Details from './assets/Details';
import Weather from './assets/Weather';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country-details" element={<Details />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;