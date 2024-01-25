import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import SignUp from './Auth/SignUp';
import Navbar from './Navbar';
import Profile from './User/Profile';
import './App.css';
import EditProfile from './User/EditProfile';
import Recipes from './Dinners/Recipes';

function App() {
  const [page, setPage] = useState('/');
  

  return (
    <>
      <Router>
        <div>
          <div>
            <Navbar onChangePage={setPage} />
          </div>
          <div>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/edit-profile' element={<EditProfile/>} />
              <Route path='/recipes' element={<Recipes />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/profile' element={<Profile/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
