import { FETCH_FOOD_TRIVIA_SUCCESS, FETCH_FOOD_TRIVIA_ERROR } from '../Actions/foodTriviaActions';

const initialFoodTriviaState = {
  foodTrivia: '',
  error: null,
};

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
