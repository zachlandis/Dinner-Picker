import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Logout() {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);

    const performLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/sign_out', {
                method: "DELETE",
                credentials: 'include',
            });

            if(response.ok) {
                console.log("Logout successful. Current User: ", currentUser);
                navigate('/login');
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    
    localStorage.removeItem('currentUser');
    console.log("Post-logout: ", currentUser)
    performLogout(); 

    return <div>Logging out...</div>;
}

export default Logout;
