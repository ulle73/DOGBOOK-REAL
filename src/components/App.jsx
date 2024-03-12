import React from 'react'
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Start from './Start'
import Create from './Create'
import Profile from './Profile'
import Edit from './Edit'
import { DogProvider } from './context'

function App() {

  


  return (
    <Router>

      <DogProvider>

        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile/:id" element={<Profile  />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>

      </DogProvider >
    </Router>
  )
}

export default App
