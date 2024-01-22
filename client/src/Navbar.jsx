import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from './UserContext'

function Navbar() {
  const location = useLocation();
  const { currentUser } = useContext(UserContext);

  const isCurrentRoute = (route) => {
    return location.pathname === route;
  };



  return (
    <div className='navbar'>
        <div className='nav-container'>
            {currentUser 
              ? 
              <Link to="/logout">Sign Out</Link>
              :
              <div>
                {!isCurrentRoute('/login') && <Link to="/login">Sign In</Link>}
                <br/>
                {!isCurrentRoute('/signup') && <Link to="/signup">Sign Up</Link>}
              </div>
            }
        </div>
    </div>
  )
}

export default Navbar