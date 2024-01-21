import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import SignUp from './Auth/SignUp';
import Navbar from './Navbar';
import Home from './Home';
import { UserContext } from './UserContext'; 
import './App.css';
import BuildProfile from './Onboarding/BuildProfile';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext); 
  const [page, setPage] = useState('/');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/current_user', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include'
        });

        if (response.ok) {
          const user = await response.json();
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      }
    };

    fetchCurrentUser(); 
  }, [setCurrentUser]);

  

  return (
    <>
      <Router>
        <div>
          <Navbar onChangePage={setPage} />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/onboarding' element={<BuildProfile />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
