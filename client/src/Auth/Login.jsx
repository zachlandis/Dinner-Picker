import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../Redux/Actions/authActions';
import { useNavigate } from 'react-router';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.auth.currentUser)
    
    useEffect(() => {
        if (currentUser) {
          console.log("From Login:", currentUser);
          if (currentUser.sign_in_count === 2) {
            navigate('/edit-profile');
          } else {
            navigate('/profile');
          }
        }
      }, [currentUser, navigate]);

    const loginUser = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        }
        
        dispatch(userLogin(loginData))
        console.log("From Login:", currentUser)
        if (currentUser.sign_in_count === 2) {
            await navigate('/edit-profile'); 
          } else {
            await navigate('/profile');
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
