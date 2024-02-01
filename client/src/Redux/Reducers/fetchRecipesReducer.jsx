import { FETCH_RECIPES_SUCCESS, FETCH_RECIPES_ERROR } from '../Actions/fetchRecipesActions';

const initialRecipesState = {
  recipes: [],
  error: null,
};

export const recipeReducer = (state = initialRecipesState, action) => {
  switch (action.type) {
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payload,
        error: null,
      };
    case FETCH_RECIPES_ERROR:
      return {
        ...state,
        recipes: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
