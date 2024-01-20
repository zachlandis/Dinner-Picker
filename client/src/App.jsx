import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import './App.css'
import SignUp from './SignUp';

function App() {

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/auth' element={<Login />} />
            <Route path='/signup' element={<SignUp/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
