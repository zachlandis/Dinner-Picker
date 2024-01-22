import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Logout() {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    
    const performLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/sign_out', {
                method: "DELETE",
                credentials: 'include',
            });

            if(response.ok) {
                console.log("Logout successful");
                localStorage.removeItem('currentUser');
                setCurrentUser({}); 
                navigate('/login');
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        performLogout();
    }, []);

    return <div>Logging out...</div>;
}

export default Logout;
