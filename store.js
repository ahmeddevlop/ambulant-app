import { configureStore } from "@reduxjs/toolkit";

import familleReducer from "./slices/familleSlice";
import articleReducer from "./slices/articleSlice";
const store = configureStore({
  reducer: { famille: familleReducer, article: articleReducer },
});
//console.log(thunk);

export default store;
