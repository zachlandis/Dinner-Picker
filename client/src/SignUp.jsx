import React, { useState } from 'react'

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

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
