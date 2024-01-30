import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "redaxios";
const uri = "http://192.168.1.21:5050";
import store from "../store";
export const articlesListe = createAsyncThunk("articlesListe", async () => {
  const {
    societe: { societeActuelle },
  } = store.getState();
  const { data } = await axios.get(
    `${uri}/api/articles/${societeActuelle.code_soc}`
  );
  return data;
});
export const articleCree = createAsyncThunk("articleCree", async (article) => {
  const config = { headers: { "Content-type": "Application/json" } };
  const { data } = await axios.post(`${uri}/api/articles/nv`, article, config);
  return data;
});
const articleSlice = createSlice({
  name: "article",
  initialState: {
    loading: false,
    articles: [],
    erreur: null,
    article: {},
  },
  extraReducers: (builder) => {
    builder.addCase(articlesListe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(articlesListe.fulfilled, (state, action) => {
      (state.loading = false), (state.articles = action.payload);
    });
    builder.addCase(articlesListe.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
    builder.addCase(articleCree.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(articleCree.fulfilled, (state, action) => {
      (state.loading = false), (state.article = action.payload);
    });
    builder.addCase(articleCree.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
  },
});
export default articleSlice.reducer;
