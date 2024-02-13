import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../Redux/Actions/authActions';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const performLogout = async () => {
      await dispatch(userLogout());
    };

    if (currentUser) {
      performLogout();
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, currentUser]);

  return <div>Logging out...</div>;
}

export default Logout;
