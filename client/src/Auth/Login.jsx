import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, userLogin } from '../Redux/Actions/authActions';
import { useNavigate } from 'react-router';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.auth.currentUser)
    
    // useEffect(() => {
    //     if (currentUser) {
    //       if (currentUser.sign_in_count === 2) {
    //         navigate('/edit-profile');
    //       } else {
    //         navigate('/profile');
    //       }
    //     }
    //   }, [currentUser, navigate]);

    const loginUser = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        }
        
        await dispatch(userLogin(loginData))
        navigate('/profile');
        // if (currentUser.sign_in_count <= 2) {
        //     await navigate('/edit-profile'); 
        //   } else {
        //     await navigate('/profile');
        //   }
    };

    return (
        <div className='login-page'>
            <br/>
            <form onSubmit={loginUser}>
                <input
                    className="login-input"
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>
                <input
                    className="login-input"
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <input type="submit" value="Login" className='login-button'/>
            </form>
            <br/>
              <img src='/Dinner-Picker.png' alt='dinner-picker-logo' className='dinner-picker-logo'/>
        </div>
    );
}

export default Login;
