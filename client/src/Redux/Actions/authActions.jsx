import axios from 'axios';

// New User Registration
export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        user: userData,
      });
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'REGISTER_ERROR', payload: error.message });
    }
  };
};

// User login
export const userLogin = (loginData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3000/users/sign_in', {
        user: loginData,
      }, {
        withCredentials: true, 
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      console.log("login successful");
      await dispatch(fetchCurrentUser());
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message });
    }
  };
};

// Fetch current user data
export const fetchCurrentUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3000/current_user', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true, 
      });

      if (response.status === 200) {
        const user = response.data;
        dispatch({ type: 'FETCH_CURRENT_USER_SUCCESS', payload: user });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_CURRENT_USER_ERROR', payload: error.message });
    }
  };
};


// User Logout
export const userLogout = () => {
  return async (dispatch) => {
    try {
      const response = await axios.delete('http://localhost:3000/users/sign_out', {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch({ type: 'LOGOUT_SUCCESS' });
      } else {
        dispatch({ type: 'LOGOUT_ERROR' });
      }
    } catch (error) {
      dispatch({ type: 'LOGOUT_ERROR' });
    }
  };
};


const initialState = {
  currentUser: null, 
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
    case 'FETCH_CURRENT_USER_SUCCESS':
      return {
        ...state,
        currentUser: action.payload, 
        error: null,
      };
    case 'REGISTER_ERROR':
    case 'LOGIN_ERROR':
    case 'FETCH_CURRENT_USER_ERROR':
      return {
        ...state,
        currentUser: null,
        error: action.payload,
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case 'LOGOUT_ERROR':
      return {
        ...state,
        error: 'Logout failed',
      };
    default:
      return state;
  }
};

export default authReducer;
