import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router';
import { UserContext } from '../UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:3000/users/sign_in';
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: password
                    }
                })
            });
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        
            const data = await response.json();
            navigate('/profile')
            setCurrentUser(data.user)
            console.log('Login successful:', data);
            localStorage.setItem('currentUser', JSON.stringify(user)); 
        } catch (error) {
            console.error('Login failed:', error);
            
        }
    };

    return (
        <div>
            <form onSubmit={loginUser}>
                <input
                    type='email'
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

export default Login;