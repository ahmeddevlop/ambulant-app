import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "redaxios";
import store from "../store";
const uri = "http://192.168.1.21:5050";
//const uri = "https://gestpro.globalsystempro.com/back_3";
export const creerInventaire = createAsyncThunk(
  "creerInventaire",
  async (inventaire) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${uri}/api/inventaire`,

      inventaire,

      config
    );
    return data;
  }
);
export const inventairesListeAction = createAsyncThunk(
  "inventaireListe",
  async ({ date_d, date_f }) => {
    const {
      societe: { societeActuelle },
    } = store.getState();
    const { data } = await axios.get(
      `${uri}/api/inventaire/invByDateAll/${societeActuelle.code_soc}/${date_d}/${date_f}`
    );
    return data;
  }
);
export const inventairesToutListeAction = createAsyncThunk(
  "inventaireToutListe",
  async () => {
    const {
      societe: { societeActuelle },
    } = store.getState();
    const { data } = await axios.get(
      `${uri}/api/inventaire/invAll/${societeActuelle.code_soc}`
    );
    return data;
  }
);
export const inventairesValiderAction = createAsyncThunk(
  "inventaireValider",
  async ({ id, num_stock }) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${uri}/api/inventaire/valider/${id}`,
      num_stock,
      config
    );
    return data;
  }
);
export const inventairesUpdateAction = createAsyncThunk(
  "inventaireUpdate",
  async ({ id, etat_inv }) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${uri}/api/inventaire/${id}`,
      { etat_inv: "C" },
      config
    );
    return data;
  }
);
const inventaireSlice = createSlice({
  name: "inventaire",
  initialState: {
    loading: false,
    succes: null,
    erreur: null,
    inventaires: [],
    inventairesTout: [],
    resValidation: "",
  },
  extraReducers: (builder) => {
    builder.addCase(creerInventaire.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(creerInventaire.fulfilled, (state, action) => {
      state.loading = false;
      state.succes = true;
    });
    builder.addCase(creerInventaire.rejected, (state, action) => {
      state.loading = false;
      succes = false;
      erreur = action.payload;
    });
    builder.addCase(inventairesListeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(inventairesListeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.inventaires = action.payload;
    });
    builder.addCase(inventairesListeAction.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
    builder.addCase(inventairesToutListeAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(inventairesToutListeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.inventairesTout = action.payload;
    });
    builder.addCase(inventairesToutListeAction.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
    builder.addCase(inventairesValiderAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(inventairesValiderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.resValidation = action.payload;
    });
    builder.addCase(inventairesValiderAction.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
    builder.addCase(inventairesUpdateAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(inventairesUpdateAction.fulfilled, (state, action) => {
      state.loading = false;
      state.resValidation = action.payload;
    });
    builder.addCase(inventairesUpdateAction.rejected, (state, action) => {
      state.loading = false;
      state.erreur = action.payload;
    });
  },
});
export default inventaireSlice.reducer;
