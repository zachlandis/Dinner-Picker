import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerUser } from '../Redux/Actions/authActions';


function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      username,
      password,
      password_confirmation: passwordConfirmation,
    };
    await dispatch(registerUser(userData));
    navigate('/login')

  };

  return (
    <div className='signup-page'>
      <form onSubmit={handleRegister} lassName="signup-form">
        <input
            className="signup-input"
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <input
          className="signup-input"
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input
            className="signup-input"
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <input
            className="signup-input"
            type='password'
            name='password_confirmation'
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br/>
        <input type='submit' value='Sign Up' className="signup-button"/>
      </form>
    </div>
  );
}

export default SignUp;
