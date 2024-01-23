import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Searchbar } from "react-native-paper";

const VenteAcceuil = () => {
  const [rech, setRech] = useState("");
  return (
    <KeyboardAvoidingView style={style.main}>
      <View style={style.blockCmd}>
        <TouchableOpacity style={style.cmdTouche}>
          <Text style={style.cmdText}>Payee</Text>
          <Text style={style.cmdText}>10DT</Text>
        </TouchableOpacity>
      </View>
      <View style={style.blockRech}>
        <Searchbar
          defaultValue={rech}
          onChangeText={(txt) => setRech(txt)}
          placeholder="Recherche article"
          mode="view"
        />
      </View>

      <ScrollView style={style.blockArt}>
        <Text>BlockArt</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  //BlockCmd
  blockCmd: {
    flex: 1.5 / 10,
    backgroundColor: "snow",
    padding: 10,
  },
  cmdTouche: {
    backgroundColor: "#16ab36",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cmdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "snow",
  },
  //Fin BlockCmd
  //Block rech
  blockRech: {
    flex: 1 / 10,

    marginTop: 1,
    marginBottom: 10,
  },

  //Fin Block rech
  blockArt: {
    flex: 7.5 / 10,
    marginTop: 25,
  },
});
export default VenteAcceuil;
