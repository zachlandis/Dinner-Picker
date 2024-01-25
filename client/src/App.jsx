import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import SignUp from './Auth/SignUp';
import Navbar from './Navbar';
import Profile from './User/Profile';
import { UserContext } from './UserContext'; 
import './App.css';
import EditProfile from './User/EditProfile';
import Recipes from './Dinners/Recipes';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext); 
  const [page, setPage] = useState('/');

  // useEffect(() => {
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const storedUser = localStorage.getItem('currentUser');
  //       if (storedUser) {
  //         setCurrentUser(JSON.parse(storedUser));
  //       } else {
  //         const response = await fetch('http://localhost:3000/current_user', {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json',
  //           },
  //           credentials: 'include'
  //         });

  //         if (response.ok) {
  //           const user = await response.json();
  //           console.log("Fetched user:", user); 
  //           setCurrentUser(user);
  //           localStorage.setItem('currentUser', JSON.stringify(user)); 
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch current user:', error);
  //     }
  //   };

  //   fetchCurrentUser(); 
  // }, [setCurrentUser]);

  

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
              <Route path='/edit-profile' element={<EditProfile currentUser={currentUser}/>} />
              <Route path='/recipes' element={<Recipes />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/profile' element={<Profile currentUser={currentUser}/>} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
