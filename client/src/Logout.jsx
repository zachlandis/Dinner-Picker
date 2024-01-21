import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const performLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/users/sign_out', {
                method: "DELETE",
                credentials: 'include',
            });

            if(response.ok) {
                console.log("Logout successful");
                
                navigate('/login');
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    performLogout(); 

    return <div>Logging out...</div>;
}

export default Logout;
