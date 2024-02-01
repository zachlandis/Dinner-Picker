import axios from 'axios';

export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_ERROR = 'FETCH_RECIPES_ERROR';

export const FETCH_FOOD_TRIVIA_SUCCESS = 'FETCH_FOOD_TRIVIA_SUCCESS';
export const FETCH_FOOD_TRIVIA_ERROR = 'FETCH_FOOD_TRIVIA_ERROR';

export const fetchRecipesSuccess = (recipes) => ({
  type: FETCH_RECIPES_SUCCESS,
  payload: recipes,
});

export const fetchRecipesError = (error) => ({
  type: FETCH_RECIPES_ERROR,
  payload: error,
});

export const fetchFoodTriviaSuccess = (foodTrivia) => ({
  type: FETCH_FOOD_TRIVIA_SUCCESS,
  payload: foodTrivia,
});

export const fetchFoodTriviaError = (error) => ({
  type: FETCH_FOOD_TRIVIA_ERROR,
  payload: error,
});

export const fetchRecipes = (currentUser, currentPage) => {
  return async (dispatch) => {
    const resultsPerPage = 10;
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?cuisine=${currentUser.preferredCuisines}&intolerances=${currentUser.intolerances}&diet=${currentUser.dietary_restrictions}&apiKey=9e18ededfa274d49bdaff560fc62a9c2&includeNutrition=true&includeIngredients&number=${resultsPerPage}&offset=${(currentPage - 1) * resultsPerPage}`
      );

      if (response.status === 200) {
        const recipes = response.data.results;
        dispatch(fetchRecipesSuccess(recipes));
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      dispatch(fetchRecipesError(error.message));
    }
  };
};

export const fetchFoodTrivia = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        'https://api.spoonacular.com/food/trivia/random?apiKey=9e18ededfa274d49bdaff560fc62a9c2'
      );

      if (response.status === 200) {
        const foodTrivia = response.data.text;
        dispatch(fetchFoodTriviaSuccess(foodTrivia));
      }
    } catch (error) {
      console.error('Error fetching food trivia:', error);
      dispatch(fetchFoodTriviaError(error.message));
    }
  };
};

const initialRecipesState = {
  recipes: [],
  error: null,
};

const initialFoodTriviaState = {
  foodTrivia: '',
  error: null,
};

// Reducer for Recipes
export const recipesReducer = (state = initialRecipesState, action) => {
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

// Reducer for Food Trivia
export const foodTriviaReducer = (state = initialFoodTriviaState, action) => {
  switch (action.type) {
    case FETCH_FOOD_TRIVIA_SUCCESS:
      return {
        ...state,
        foodTrivia: action.payload,
        error: null,
      };
    case FETCH_FOOD_TRIVIA_ERROR:
      return {
        ...state,
        foodTrivia: '',
        error: action.payload,
      };
    default:
      return state;
  }
};
