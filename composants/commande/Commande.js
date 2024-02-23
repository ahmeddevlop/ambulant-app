import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
const Commande = ({ commande, index, navigation }) => {
  const dispatch = useDispatch();
  const url = "https://gestpro.globalsystempro.com";
  return (
    <View style={{ backgroundColor: index % 2 == 0 ? "#d0f2a0" : "#ecf7dc" }}>
      <Text style={style.text}>{commande.nom_cli}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CommandeDetails", {
            commande: commande,
          })
        }
        style={{
          display: "flex",
          flexDirection: "row",
          // alignItems: "right",
          // justifyContent: "right",

          height: "auto",
          marginBottom: 5,
          padding: 5,
          marginTop: 5,
        }}
      >
        <Text style={style.text}>
          {commande.date_livraison.substring(0, 10) +
            " " +
            commande.date_livraison.substring(11, 16)}
        </Text>

        <Text style={style.text}>
          {Number(commande.totalePrix).toFixed(3)}DT
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  text: {
    fontSize: 18,
    marginLeft: 5,
    //alignSelf: "center",
    verticalAlign: "middle",
    //fontWeight: "bold",
    color: "black",
    flex: 1 / 2,
  },
  libStock: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    flex: 4.5 / 7,
  },
});
export default Commande;
