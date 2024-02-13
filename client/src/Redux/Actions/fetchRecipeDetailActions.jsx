import axios from 'axios';

export const FETCH_RECIPE_DETAILS_SUCCESS = 'FETCH_RECIPE_DETAILS_SUCCESS';
export const FETCH_RECIPE_DETAILS_ERROR = 'FETCH_RECIPE_DETAILS_ERROR';

export const fetchRecipeDetailsSuccess = (recipeDetails) => ({
  type: FETCH_RECIPE_DETAILS_SUCCESS,
  payload: recipeDetails,
});

export const fetchRecipeDetailsError = (error) => ({
  type: FETCH_RECIPE_DETAILS_ERROR,
  payload: error,
});

export const fetchRecipeDetails = (recipeId) => {
  return async (dispatch) => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=9e18ededfa274d49bdaff560fc62a9c2`
    );

    if (response.status === 200) {
      const recipeDetails = response.data;
      dispatch(fetchRecipeDetailsSuccess(recipeDetails));
    } else {
      console.error('Error fetching recipe details:', response.statusText);
      dispatch(fetchRecipeDetailsError(response.statusText));
    }
  };
};
