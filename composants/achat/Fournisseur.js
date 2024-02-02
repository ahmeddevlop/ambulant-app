import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modal, TextInput } from "react-native-paper";
import { ajoutChariot } from "../../slices/chariotSlice";
import { useDispatch, useSelector } from "react-redux";
const Fournisseur = ({ fournisseur, source }) => {
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, height: "auto", justifyContent: "space-between" }}>
      <View style={style.main}>
        <View style={style.libStock}>
          <Text style={style.text}>{fournisseur.nom_frn}</Text>

          {/*Block Quantité */}

          {/* Fin Block quantité */}
        </View>
        <Text style={{ verticalAlign: "middle", flex: 4 / 7 }}>
          {"Adresse:" + fournisseur.adr_frn}
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "right",
    // justifyContent: "right",
    backgroundColor: "snow",
    height: "auto",
    marginBottom: 10,
    padding: 15,
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "green",
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    //alignSelf: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
  },
  libStock: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    flex: 4.5 / 7,
    height: "auto",
  },
});
export default Fournisseur;
