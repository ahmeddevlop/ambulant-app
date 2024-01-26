import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

export const getDBConnection = createAsyncThunk(
  "getDBConnection",
  async () => {}
);
export const famAjoutLoc = createAsyncThunk("famAjoutLoc", async (famille) => {
  let res;
  const db = SQLite.openDatabase("example.db");
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS famille (id INTEGER PRIMARY KEY AUTOINCREMENT, lib_fam TEXT,code_fam TEXT,description TEXT,image TEXT,societe TEXT,code_soc TEXT)",
      null,
      (txObj, resultSet) => console.log("tab famille crée avec succés!")
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO famille (code_fam,lib_fam,description,image,societe,code_soc) values (?,?,?,?,?,?)",
      [
        famille.code_fam,
        famille.lib_fam,
        famille.description,
        famille.image,
        famille.societe,
        famille.code_soc,
      ],
      (txObj, resultSet) => (res = resultSet.rows.array)
    );
  });
  return res;
});
const SQLiteSlice = createSlice({
  name: "SQLiteDB",
  initialState: {
    succesAjout: false,
    erreur: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(famAjoutLoc.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(famAjoutLoc.fulfilled, (state, action) => {
      (state.loading = false), (state.succesAjout = true);
    });
    builder.addCase(famAjoutLoc.rejected, (state, action) => {
      (state.loading = false), (state.erreur = action.payload);
    });
  },
});
export default SQLiteSlice.reducer;
