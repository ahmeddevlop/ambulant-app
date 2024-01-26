import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import familleReducer from "./slices/familleSlice";
import articleReducer from "./slices/articleSlice";
import SQliteReducer from "./slices/sqliteSlice";
import chariotReducer from "./slices/chariotSlice";
import commandeReducer from "./slices/commandeSlice";
const store = configureStore({
  reducer: {
    famille: familleReducer,
    article: articleReducer,
    SQLiteState: SQliteReducer,
    chariot: chariotReducer,
    commande: commandeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
//console.log(thunk);

export default store;
