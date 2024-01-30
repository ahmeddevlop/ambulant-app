import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { ajoutChariot } from "../../slices/chariotSlice";
import { useDispatch, useSelector } from "react-redux";
const Client = ({ client }) => {
  const dispatch = useDispatch();
  const url = "https://gestpro.globalsystempro.com";

  return (
    <View>
      <View style={style.main}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            flex: 1 / 7,
            alignSelf: "center",
          }}
          source={{ uri: url + client?.photo_cli }}
        />
        <View style={style.libStock}>
          <Text style={style.text}>{client.nom_cli}</Text>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 5,
              //alignSelf: "center",
              verticalAlign: "middle",
            }}
          >
            Tel:{client.tel_cli}
          </Text>

          {/*Block Quantité */}

          {/* Fin Block quantité */}
        </View>
        <Text style={{ verticalAlign: "middle", flex: 1.5 / 7 }}>
          {client.cin}
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
    height: 70,
    marginBottom: 10,
    padding: 5,
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
  },
});
export default Client;
