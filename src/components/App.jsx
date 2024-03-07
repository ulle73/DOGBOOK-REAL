import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Start from './Start';
import Create from './Create';
import Profile from './Profile';
import Edit from './Edit';

function App() {
  return (
    <Router>
   

        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
   
    </Router>
  );
}

export default App;
