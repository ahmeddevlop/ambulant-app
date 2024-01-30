import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "redaxios";
import store from "../store";
const uri = "http://192.168.1.21:5050";
export const creerCommande = createAsyncThunk(
  "creerCommande",
  async (commande) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${uri}/api/commandes`,

      commande,

      config
    );
    return data;
  }
);
export const commandeListeAction = createAsyncThunk(
  "commandeListe",
  async ({ date_d, date_f }) => {
    const {
      societe: { societeActuelle },
    } = store.getState();
    const { data } = await axios.get(
      `${uri}/api/commandes/cmdByDateAll/${societeActuelle.code_soc}/${date_d}/${date_f}`
    );
    return data;
  }
);
const commandeSlice = createSlice({
  name: "commande",
  initialState: {
    loading: false,
    succes: null,
    erreur: null,
    commandes: [],
  },
  extraReducers: (builder) => {
    builder.addCase(creerCommande.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(creerCommande.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = true;
    });
    builder.addCase(creerCommande.rejected, (state, action) => {
      state.loading = false;
      succes = false;
      erreur = action.payload;
    });
    builder.addCase(commandeListeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(commandeListeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.commandes = action.payload;
    });
    builder.addCase(commandeListeAction.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
  },
});
export default commandeSlice.reducer;
