import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "redaxios";
const uri = "http://192.168.1.21:5050";
export const ajoutChariot = createAsyncThunk(
  "ajoutChariot",
  ({ article, qte, prix }) => {
    console.log("prix:", prix);
    return {
      article: article._id,
      nom: article.nom,
      image: article.image,
      prix: article.prix_1,
      prix_achat: prix,
      num_stock: article.num_stock,
      qty: qte,
    };
  }
);
export const revertChariot = createAction("REVERT_ALL");
let initialState = {
  chariotListe: [],
  total: 0,
  livraisonAdresse: {},
  date_livraison: new Date().getDate(),
  varGlo: {},
  loading: false,
  erreur: null,
};
const chariotSlice = createSlice({
  name: "chariot",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(ajoutChariot.pending, (state, action) => {
      loading = true;
    });
    builder.addCase(ajoutChariot.fulfilled, (state, action) => {
      const item = action.payload;
      const itemExist = state.chariotListe.find(
        (x) => x.article === item.article
      );

      if (itemExist) {
        //...state c.a.d laisse les autres info sans changement

        (loading = false),
          (state.chariotListe = state.chariotListe.map((x) =>
            x.article === itemExist.article ? item : x
          )),
          (state.total = state.chariotListe
            .reduce((acc, i) => acc + i.prix_total, 0)
            .toFixed(3));
      } else {
        (state.loading = false),
          (state.total = state.chariotListe
            .reduce((acc, i) => acc + i.prix_total, 0)
            .toFixed(3)),
          (state.chariotListe = [...state.chariotListe, item]);
      }
    });
    builder.addCase(ajoutChariot.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
    builder.addCase(revertChariot, (state) =>
      Object.assign(state, initialState)
    );
  },
});
export default chariotSlice.reducer;
