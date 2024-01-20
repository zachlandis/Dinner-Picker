import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login'
import './App.css'
import SignUp from './SignUp';
import Navbar from './Navbar';

function App() {
  const [page, setPage] = useState('/');

  return (
    <>
      <div>
        <Router>
        <div>
        <Navbar onChangePage={setPage}/>
        </div>
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
