import { UPDATE_WISHLIST_SUCCESS, UPDATE_WISHLIST_FAILURE } from '../Actions/wishlistActions';

const initialState = {
  updateSuccess: false,
  updateError: false,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WISHLIST_SUCCESS:
      return {
        ...state,
        updateSuccess: true,
        updateError: false,
      };
    case UPDATE_WISHLIST_FAILURE:
      return {
        ...state,
        updateSuccess: false,
        updateError: true,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
