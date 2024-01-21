import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router'


function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const registerUser = async (event) => {
        event.preventDefault(); 

        const url = 'http://localhost:3000/users'; 
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              user: {
                email: email,
                username: username,
                password: password,
                password_confirmation: passwordConfirmation 
              }
            })
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Registration successful:', data);
          navigate('/login');
          
          
          
        } catch (error) {
          console.error('Registration failed:', error);
          
        }
    };
      
    return (
        <div>
            <form onSubmit={registerUser}>
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
            </form>
        </div>
    )
}

export default SignUp
