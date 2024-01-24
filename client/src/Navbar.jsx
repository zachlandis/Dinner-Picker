import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

function Navbar() {
  const location = useLocation();
  const { currentUser } = useContext(UserContext);

  const isCurrentRoute = (route) => location.pathname === route;

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        <div className='app-name'>Dinner Picker</div>
        <div className='recipes-link'>
          <Link to="/recipes">Recipes</Link>
        </div>
        <div className='user-dropdown'>
          {currentUser && Object.keys(currentUser).length !== 0 ? (
            <div className='dropdown'>
              <button className='dropbtn'>{currentUser.username}</button>
              <div className='dropdown-content'>
                <Link to="/profile">Profile</Link>
                <Link to="/logout">Sign Out</Link>
              </div>
            </div>
          ) : (
            <div className='dropdown'>
              <button className='dropbtn'>Account</button>
              <div className='dropdown-content'>
                {!isCurrentRoute('/login') && <Link to="/login">Sign In</Link>}
                {!isCurrentRoute('/signup') && <Link to="/signup">Sign Up</Link>}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
