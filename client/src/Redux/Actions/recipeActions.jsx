import axios from 'axios';

// Fetch recipes
export const fetchRecipes = (currentUser, currentPage) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${currentUser.preferredCuisines}&intolerances=${currentUser.intolerances}&diet=${currentUser.dietary_restrictions}&apiKey=9e18ededfa274d49bdaff560fc62a9c2&includeNutrition=true&includeIngredients&number=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}`
      );

      if (response.status === 200) {
        const data = response.data;
        dispatch({ type: 'FETCH_RECIPES_SUCCESS', payload: data.results });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_RECIPES_ERROR', payload: error.message });
    }
  };
};


const initialState = {
    recipes: [],
    totalPages: 0,
    currentPage: 1,
  };
  
  const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_RECIPES_SUCCESS':
        return {
          ...state,
          recipes: [...state.recipes, ...action.payload],
          totalPages: Math.ceil(action.payload.totalResults / resultsPerPage),
        };
      case 'FETCH_RECIPES_ERROR':
        return state; // Handle errors as needed
      default:
        return state;
    }
  };
  
  export default recipeReducer;
  