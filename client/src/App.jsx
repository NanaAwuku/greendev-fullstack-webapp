import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Registration } from './pages'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default App