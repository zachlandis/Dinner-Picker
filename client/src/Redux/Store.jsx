import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Actions/authActions";
import { recipeReducer } from "./Reducers/fetchRecipesReducer";
import { foodTriviaReducer } from "./Reducers/foodTriviaReducer";
import { recipeDetailsReducer } from "./Reducers/fetchRecipeDetailsReducer";
import wishlistReducer from "./Reducers/wishlistReducer";


const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipeReducer,
    trivia: foodTriviaReducer,
    recipeDetails: recipeDetailsReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
