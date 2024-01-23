import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext); 

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
            console.log("From Login", data.user)
            setCurrentUser(data.user);

            
            if (data.user.sign_in_count === 2) {
                navigate('/edit-profile'); 
            } else {
                navigate('/profile');
            }
            
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
    );
}

export default Login;
