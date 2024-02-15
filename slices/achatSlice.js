import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "redaxios";
import store from "../store";
const uri = "http://192.168.1.21:5050";
//const uri = "https://gestpro.globalsystempro.com";
export const creerAchat = createAsyncThunk("creerAchat", async (achat) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  };

  const { data } = await axios.post(
    `${uri}/api/achats`,

    achat,

    config
  );
  return data;
});
export const achatListeAction = createAsyncThunk(
  "achatListeAction",
  async ({ date_d, date_f }) => {
    const {
      societe: { societeActuelle },
    } = store.getState();
    const { data } = await axios.get(
      `${uri}/api/achats/date/${societeActuelle.code_soc}/${date_d}/${date_f}`
    );
    return data;
  }
);
const achatSlice = createSlice({
  name: "achat",
  initialState: {
    loading: false,
    succes: null,
    erreur: null,
    achats: [],
  },
  extraReducers: (builder) => {
    builder.addCase(creerAchat.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(creerAchat.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = true;
    });
    builder.addCase(creerAchat.rejected, (state, action) => {
      state.loading = false;
      succes = false;
      erreur = action.payload;
    });
    builder.addCase(achatListeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(achatListeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.achats = action.payload;
    });
    builder.addCase(achatListeAction.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
  },
});
export default achatSlice.reducer;
