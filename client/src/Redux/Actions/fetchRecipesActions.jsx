import axios from 'axios';

export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR';

export const fetchRecipesSuccess = (recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const fetchRecipesError = (error) => ({
  type: FETCH_RECIPES_ERROR,
  payload: error,
});

export const fetchRecipes = (currentUser, currentPage) => {
  return async (dispatch) => {
    const resultsPerPage = 10;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=${currentUser.preferredCuisines}&intolerances=${currentUser.intolerances}&diet=${currentUser.dietary_restrictions}&apiKey=9e18ededfa274d49bdaff560fc62a9c2&includeNutrition=true&includeIngredients&number=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}`
    );

    if (response.status === 200) {
      const recipes = response.data.results;
      dispatch(fetchRecipesSuccess(recipes));
    } else {
      console.error('Error fetching recipes:', response.statusText);
      dispatch(fetchRecipesError(response.statusText));
    }
  };
};

