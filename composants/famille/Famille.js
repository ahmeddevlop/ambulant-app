import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Famille = ({ famille, reseau, navigation }) => {
  const url = reseau ? "https://gestpro.globalsystempro.com" : "";
  return (
    <TouchableOpacity
      style={style.main}
      onPress={() =>
        navigation.navigate("FamilleMiseAJour", { famille: famille })
      }
    >
      <Image
        style={{ height: 50, width: 50 }}
        source={{ uri: url + famille?.image }}
      />
      <Text style={style.text}>{famille.lib_fam}</Text>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "right",
    // justifyContent: "right",
    backgroundColor: "snow",
    height: 70,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    alignSelf: "center",
    verticalAlign: "middle",
  },
});
export default Famille;
