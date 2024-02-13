import {
    UPDATE_PROFILE_OPTIONS_REQUEST,
    UPDATE_PROFILE_OPTIONS_SUCCESS,
    UPDATE_PROFILE_OPTIONS_FAILURE,
  } from '../Actions/profileActions.jsx';
  
  const initialState = {
    loading: false,
    updateSuccess: false,
    error: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PROFILE_OPTIONS_REQUEST:
        return {
          ...state,
          loading: true,
          updateSuccess: false,
          error: null,
        };
      case UPDATE_PROFILE_OPTIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          updateSuccess: true,
          error: null,
        };
      case UPDATE_PROFILE_OPTIONS_FAILURE:
        return {
          ...state,
          loading: false,
          updateSuccess: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default profileReducer;
  