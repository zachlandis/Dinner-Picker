import {
  UPDATE_WISHLIST_SUCCESS,
  UPDATE_WISHLIST_FAILURE,
  REMOVE_FROM_WISHLIST_SUCCESS,
  REMOVE_FROM_WISHLIST_FAILURE,
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAILURE,
} from '../Actions/wishlistActions';

const initialState = {
  updateSuccess: false,
  updateError: false,
  removeSuccess: false,
  removeError: false,
  fetchSuccess: false,
  fetchError: false,
  wishlistId: null, 
  wishlist: [], 
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WISHLIST_SUCCESS:
      return {
        ...state,
        updateSuccess: true,
        updateError: false,
        wishlist: action.updatedWishlist,
      };
    case UPDATE_WISHLIST_FAILURE:
      return {
        ...state,
        updateSuccess: false,
        updateError: true,
      };
    case REMOVE_FROM_WISHLIST_SUCCESS:
      const updatedWishlist = state.wishlist.filter(
        (item) => item.id !== action.itemId
      );
      return {
        ...state,
        removeSuccess: true,
        removeError: false,
        wishlist: updatedWishlist,
      };
    case REMOVE_FROM_WISHLIST_FAILURE:
      return {
        ...state,
        removeSuccess: false,
        removeError: true,
      };
    case FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        fetchSuccess: true,
        fetchError: false,
        wishlistId: action.wishlistId, 
        wishlist: action.wishlist, 
      };
    case FETCH_WISHLIST_FAILURE:
      return {
        ...state,
        fetchSuccess: false,
        fetchError: true,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
