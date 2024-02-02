import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";
import store from "../store";
const uri = "http://192.168.1.21:5050";

export const fournisseursListe = createAsyncThunk(
  "fournisseursListe",
  async () => {
    //Cas en ligne
    const {
      societe: { societeActuelle },
    } = store.getState();
    const { data } = await axios.get(
      `${uri}/api/frn/${societeActuelle.code_soc}`
    );
    return data;
  }
);
export const fournisseurCree = createAsyncThunk(
  "fournisseurCree",
  async (fournisseur) => {
    const config = { headers: { "Content-type": "Application/json" } };

    const { data } = await axios.post(`${uri}/api/frn`, fournisseur, config);
    return data;
  }
);
export const fournisseurActuelleAction = createAsyncThunk(
  "fournisseurActuelle",
  (fournisseur) => {
    return fournisseur;
  }
);
const initialState = {
  fournisseurs: [],
  loading: false,
  erreur: "",
  fournisseur: {},
  fournisseurActuelle: {},
};
const fournisseurSlice = createSlice({
  name: "fournisseur",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fournisseursListe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fournisseursListe.fulfilled, (state, action) => {
      (state.fournisseurs = action.payload), (state.loading = false);
    });
    builder.addCase(fournisseursListe.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
    builder.addCase(fournisseurCree.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fournisseurCree.fulfilled, (state, action) => {
      (state.fournisseur = action.payload), (state.loading = false);
    });
    builder.addCase(fournisseurCree.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
    builder.addCase(fournisseurActuelleAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fournisseurActuelleAction.fulfilled, (state, action) => {
      (state.fournisseurActuelle = action.payload), (state.loading = false);
    });
    builder.addCase(fournisseurActuelleAction.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
  },
});
export default fournisseurSlice.reducer;
