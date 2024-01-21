import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='container'>
            <Link to="/login">Sign In</Link>
            <Link to="/logout">Sign Out</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
    </div>
  )
}

export default Navbar