import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "redaxios";
//const uri = "http://192.168.1.21:5050";
const uri = "https://gestpro.globalsystempro.com/back_3";
export const societeCreeAction = createAsyncThunk(
  "societeCree",
  async (societe) => {
    console.log(societe);
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };
    const { data } = await axios.post(`${uri}/api/societe`, societe, config);
    return data;
  }
);
export const societeAuth = createAsyncThunk(
  "societeAuth",
  async (societe, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-type": "Application/json",
        },
      };
      const { data } = await axios.post(
        `${uri}/api/societe/auth`,
        societe,
        config
      );
      console.log(data);
      return data[0];
    } catch (err) {
      return rejectWithValue(err.data.message);
    }
  }
);
export const logout = createAction("LOGOUT");
let initialState = {
  loading: false,
  erreur: "",
  societeActuelle: {},
  societeCree: {},
};
const societeSlice = createSlice({
  name: "Societe",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(societeCreeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(societeCreeAction.fulfilled, (state, action) => {
      (state.loading = false), (state.societeCree = action.payload);
    });
    builder.addCase(societeCreeAction.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
    builder.addCase(societeAuth.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(societeAuth.fulfilled, (state, action) => {
      (state.loading = false), (state.societeActuelle = action.payload);
    });
    builder.addCase(societeAuth.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
    builder.addCase(logout, (state) => Object.assign(state, initialState));
  },
});

export default societeSlice.reducer;
