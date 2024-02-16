import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import familleReducer from "./slices/familleSlice";
import articleReducer from "./slices/articleSlice";
import SQliteReducer from "./slices/sqliteSlice";
import chariotReducer from "./slices/chariotSlice";
import commandeReducer from "./slices/commandeSlice";
import clientReducer from "./slices/clientSlice";
import societeReducer from "./slices/societeSlice";
import fournisseurReducer from "./slices/fournisseurSlice";
import achatReducer from "./slices/achatSlice";
import inventaireReducer from "./slices/inventaireSlice";
const store = configureStore({
  reducer: {
    famille: familleReducer,
    article: articleReducer,
    SQLiteState: SQliteReducer,
    chariot: chariotReducer,
    commande: commandeReducer,
    client: clientReducer,
    societe: societeReducer,
    fournisseur: fournisseurReducer,
    achat: achatReducer,
    inventaire: inventaireReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
//console.log(thunk);

export default store;
