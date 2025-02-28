import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Scan from './pages/Scan';
import History from './pages/History';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
