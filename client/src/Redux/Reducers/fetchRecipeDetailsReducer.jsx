import { FETCH_RECIPE_DETAILS_SUCCESS, FETCH_RECIPE_DETAILS_ERROR } from '../Actions/fetchRecipeDetailActions';

const initialRecipeDetailsState = {
    recipeDetails: {},
    error: null,
  };
  
  export const recipeDetailsReducer = (state = initialRecipeDetailsState, action) => {
    switch (action.type) {
      case FETCH_RECIPE_DETAILS_SUCCESS:
        return {
          ...state,
          recipeDetails: action.payload,
          error: null,
        };
      case FETCH_RECIPE_DETAILS_ERROR:
        return {
          ...state,
          recipeDetails: {},
          error: action.payload,
        };
      default:
        return state;
    }
  };
  