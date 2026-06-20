import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import Student from './dashboard/studentPage/Student'
import './App.css'

function App() {
  return (
    <div>
      <Dashboard />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/student' element={<Student />}/>
      </Routes>
    </div>
  )
}

export default App