import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { clientActuelleAction, clientParCode } from "../../slices/clientSlice";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const ClientDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const cliCode = useSelector((state) => state.client);
  const { client, loading, erreur } = cliCode;
  const url = "https://gestpro.globalsystempro.com";

  useEffect(() => {}, []);

  return (
    <View>
      <TouchableOpacity
        style={{ backgroundColor: "#4299f5", padding: 5 }}
        onPress={() => {
          dispatch(clientActuelleAction(route.params.client));
          navigation.navigate("VenteAcceuil");
        }}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            verticalAlign: "middle",
            color: "snow",
            fontWeight: "bold",
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} size={18} color="snow" /> Passer
          Commande
        </Text>
      </TouchableOpacity>
      <Image
        style={{
          height: 150,
          width: 150,
          borderRadius: 25,

          alignSelf: "center",
        }}
        source={{ uri: url + route.params.client?.photo_cli }}
      />
      <ScrollView style={{ height: "auto" }}>
        <View style={style.toucheZone}>
          <Text style={style.toucheText}>Cod Client :</Text>
          <Text style={style.toucheText}>{route.params.client.cod_cli}</Text>
        </View>
        <View style={style.toucheZone}>
          <Text style={style.toucheText}>nom Client :</Text>
          <Text style={style.toucheText}>{route.params.client.nom_cli}</Text>
        </View>
        <View style={style.toucheZone}>
          <Text style={style.toucheText}>Adress Client :</Text>
          <Text style={style.toucheText}>{route.params.client.adr_cli}</Text>
        </View>
        <View style={style.toucheZone}>
          <Text style={style.toucheText}>Tel Client :</Text>
          <Text style={style.toucheText}>{route.params.client.tel_cli}</Text>
        </View>
        <View style={style.toucheZone}>
          <Text style={style.toucheText}>Cod Tva :</Text>
          <Text style={style.toucheText}>{route.params.client.cod_tva}</Text>
        </View>
        <View style={style.toucheZone}>
          <Text style={style.toucheText}>Solde Client :</Text>
          <Text style={style.toucheText}>{route.params.client.solde}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  langueBar: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "snow",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    height: "auto",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  rectangle: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "yellow",
    //position: "absolute",
    zIndex: 99,
    marginTop: 1,

    //top: "0.1%",
    //left: "1%",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    //lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",

    opacity: 1,

    marginBottom: 7,
  },
  text2: {
    color: "yellow",
    fontSize: 40,
    //lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",

    opacity: 1,

    marginBottom: 7,
  },
  touche: {
    flexDirection: "column",
  },
  toucheZoneAR: {
    width: "100%",
    margin: 8,
    height: 70,
    padding: 10,
    //alignContent: "center",
    backgroundColor: "snow",
    borderRadius: 10,
    opacity: 0.8,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  toucheZone: {
    width: "100%",
    margin: 8,
    height: 70,
    //alignContent: "center",
    backgroundColor: "snow",
    borderRadius: 10,
    opacity: 0.8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  toucheText: {
    //fontWeight: "bold",
    textAlign: "center",
    fontSize: 19,
    padding: 3,
    flex: 1 / 2,
  },
  toucheIcon: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 50,
    padding: 3,
  },
});

export default ClientDetails;
