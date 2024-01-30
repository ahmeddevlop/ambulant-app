import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import familleReducer from "./slices/familleSlice";
import articleReducer from "./slices/articleSlice";
import SQliteReducer from "./slices/sqliteSlice";
import chariotReducer from "./slices/chariotSlice";
import commandeReducer from "./slices/commandeSlice";
import clientReducer from "./slices/clientSlice";
import societeReducer from "./slices/societeSlice";
const store = configureStore({
  reducer: {
    famille: familleReducer,
    article: articleReducer,
    SQLiteState: SQliteReducer,
    chariot: chariotReducer,
    commande: commandeReducer,
    client: clientReducer,
    societe: societeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
//console.log(thunk);

export default store;
