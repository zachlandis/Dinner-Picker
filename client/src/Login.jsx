import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (email, password) => {
        const url = 'http://localhost:3000/users/sign_in'; 
        
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
                password: password
                }
            })
            });
        
            if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
            }
        
            const data = await response.json();
            console.log('Login successful:', data);
        
        } catch (error) {
            console.error('Login failed:', error);
        
        }
        };

  return (
    <div>
        <form onSubmit={loginUser}>
            <input
                type='text'
                name='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
           <input
                type='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Login" />

        </form>
    </div>
  )
}

export default Login