import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";
import store from "../store";
//const uri = "http://192.168.1.21:5050";
const uri = "https://gestpro.globalsystempro.com/back_3";
export const familleListe = createAsyncThunk("familleListe", async () => {
  //Cas en ligne
  const {
    societe: { societeActuelle },
  } = store.getState();
  const { data } = await axios.get(
    `${uri}/api/familles/${societeActuelle.code_soc}`
  );
  return data;
});
export const familleCree = createAsyncThunk("familleCree", async (famille) => {
  const config = { headers: { "Content-type": "Application/json" } };

  const { data } = await axios.post(`${uri}/api/familles`, famille, config);
  return data;
});
export const familleUpdateAction = createAsyncThunk(
  "familleUpdateAction",
  async (famille) => {
    const config = { headers: { "Content-type": "Application/json" } };

    const { data } = await axios.put(
      `${uri}/api/familles/${famille._id}`,
      famille,
      config
    );
    return data;
  }
);
const familleSlice = createSlice({
  name: "familleListe",
  initialState: {
    familles: [],
    loading: false,
    erreur: "",
    famille: {},
  },
  extraReducers: (builder) => {
    builder.addCase(familleListe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(familleListe.fulfilled, (state, action) => {
      (state.familles = action.payload), (state.loading = false);
    });
    builder.addCase(familleListe.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
    builder.addCase(familleCree.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(familleCree.fulfilled, (state, action) => {
      (state.famille = action.payload), (state.loading = false);
    });
    builder.addCase(familleCree.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
    builder.addCase(familleUpdateAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(familleUpdateAction.fulfilled, (state, action) => {
      (state.famille = action.payload), (state.loading = false);
    });
    builder.addCase(familleUpdateAction.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
  },
});
export default familleSlice.reducer;
