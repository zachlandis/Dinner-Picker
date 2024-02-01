import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Actions/authActions";
import { recipesReducer } from "./Actions/recipeActions";


const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes: recipesReducer
  },
});

export default store;
