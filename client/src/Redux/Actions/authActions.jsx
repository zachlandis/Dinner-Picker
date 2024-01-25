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

const initialState = {
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case 'REGISTER_ERROR':
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
