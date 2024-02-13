import { REMOVE_FROM_SHOPPING_LIST } from '../Actions/shoppingListActions';

const initialState = {
  shoppingListItems: [], 
};

const shoppingListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_FROM_SHOPPING_LIST:
      return {
        ...state,
        shoppingListItems: state.shoppingListItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default shoppingListReducer;
