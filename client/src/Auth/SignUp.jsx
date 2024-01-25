import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/actions/authActions';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = {
      email,
      username,
      password,
      password_confirmation: passwordConfirmation,
    };
    dispatch(registerUser(userData));
  };

  return (
    <div className="profile-form">
      <form onSubmit={handleRegister}>
        <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <input
            type='password'
            name='password_confirmation'
            placeholder='Confirm Password'
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br/>
        <input type='submit' value='sign-up'/>
        {authError && <p className="error-message">{authError}</p>}
      </form>
    </div>
  );
}

export default SignUp;
