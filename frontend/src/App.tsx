import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import AuditResults from './components/AuditResults';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <div className="min-h-screen gradient-bg-light">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/audit-results" element={<AuditResults />} />
      </Routes>
    </div>
  );
}

export default App;