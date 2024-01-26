import { faL } from "@fortawesome/free-solid-svg-icons";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "redaxios";
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
const commandeSlice = createSlice({
  name: "commande",
  initialState: {
    loading: false,
    succes: null,
    erreur: null,
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
  },
});
export default commandeSlice.reducer;
