import axios from 'axios';
import { fetchCurrentUser } from './authActions'; // Import the fetchCurrentUser action


export const UPDATE_PROFILE_OPTIONS_REQUEST = 'UPDATE_PROFILE_OPTIONS_REQUEST';
export const UPDATE_PROFILE_OPTIONS_SUCCESS = 'UPDATE_PROFILE_OPTIONS_SUCCESS';
export const UPDATE_PROFILE_OPTIONS_FAILURE = 'UPDATE_PROFILE_OPTIONS_FAILURE';

export const updateProfileOptionsRequest = () => ({
  type: UPDATE_PROFILE_OPTIONS_REQUEST,
});

export const updateProfileOptionsSuccess = () => ({
  type: UPDATE_PROFILE_OPTIONS_SUCCESS,
});

export const updateProfileOptionsFailure = (error) => ({
  type: UPDATE_PROFILE_OPTIONS_FAILURE,
  payload: error,
});


export const updateProfileOptions = (profileData, navigate) => {
  return async (dispatch) => {
    dispatch(updateProfileOptionsRequest());
    try {
      const response = await axios.patch('http://localhost:3000/update_user', {
        user: profileData,
      }, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log('Update successful');
        dispatch(updateProfileOptionsSuccess());
        dispatch(fetchCurrentUser()); // Dispatch action to update currentUser
        navigate('/profile'); // Navigate back to profile page
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Update failed:', error);
      dispatch(updateProfileOptionsFailure(error.message));
    }
  };
};
