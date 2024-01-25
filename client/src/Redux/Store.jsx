import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Actions/authActions";


const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
