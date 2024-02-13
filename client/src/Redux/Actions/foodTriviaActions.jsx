import axios from 'axios';


export const FETCH_FOOD_TRIVIA_SUCCESS = 'FETCH_FOOD_TRIVIA_SUCCESS';
export const FETCH_FOOD_TRIVIA_ERROR = 'FETCH_FOOD_TRIVIA_ERROR';

export const fetchFoodTriviaSuccess = (foodTrivia) => ({
  type: FETCH_FOOD_TRIVIA_SUCCESS,
  payload: foodTrivia,
});

export const fetchFoodTriviaError = (error) => ({
  type: FETCH_FOOD_TRIVIA_ERROR,
  payload: error,
});

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
