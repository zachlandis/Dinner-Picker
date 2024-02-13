import axios from 'axios';
import { fetchCurrentUser } from './authActions';

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
    const response = await axios.patch('http://localhost:3000/update_user', {
      user: profileData,
    }, {
      withCredentials: true,
    });

    if (response.status === 200) {
      dispatch(updateProfileOptionsSuccess());
      dispatch(fetchCurrentUser());
      navigate('/profile');
    } else {
      console.error('Update failed:', response.statusText);
      dispatch(updateProfileOptionsFailure(response.statusText));
    }
  };
};
