import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "redaxios";
//const uri = "http://192.168.1.21:5050";
const uri = "https://gestpro.globalsystempro.com/back_3";
export const clientCree = createAsyncThunk("clientCree", async (client) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const { data } = await axios.post(`${uri}/api/clients`, client, config);
  return data;
});
export const clientListe = createAsyncThunk("clientListe", async () => {
  const { data } = await axios.get(`${uri}/api/clients`);
  return data;
});
export const clientParCode = createAsyncThunk(
  "clientParCode",
  async (cod_cli) => {
    return data;
    const { data } = await axios.get(`${uri}/api/clients/${cod_cli}`);
  }
);
export const clientActuelleAction = createAsyncThunk(
  "clientActuelle",
  (client) => {
    return client;
  }
);
const clientSlice = createSlice({
  name: "Client",
  initialState: {
    loading: false,
    client: {},
    erreur: null,
    clients: [],
    clientActuelle: {},
  },
  extraReducers: (builder) => {
    builder.addCase(clientCree.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clientCree.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload;
    });
    builder.addCase(clientCree.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
    builder.addCase(clientListe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clientListe.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action.payload;
    });
    builder.addCase(clientListe.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
    builder.addCase(clientParCode.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clientParCode.fulfilled, (state, action) => {
      state.loading = false;
      state.client = action.payload;
    });
    builder.addCase(clientParCode.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
    builder.addCase(clientActuelleAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(clientActuelleAction.fulfilled, (state, action) => {
      state.loading = false;
      state.clientActuelle = action.payload;
    });
    builder.addCase(clientActuelleAction.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
  },
});
export default clientSlice.reducer;
