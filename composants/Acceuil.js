import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Acceuil = ({ navigation }) => {
  return (
    <View style={{ flex: 1, display: "flex" }}>
      <View style={style.titreView}>
        <Text style={style.titreText}>Bienvenue dans Application Ambulant</Text>
      </View>

      <View style={style.btnView}>
        <TouchableOpacity
          style={style.btnTouche}
          onPress={() => navigation.navigate("SocieteInsc")}
        >
          <Text style={style.btnText}>Inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.btnTouche}
          onPress={() => navigation.navigate("SocieteLogin")}
        >
          <Text style={style.btnText}>Authentification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  titreView: {
    flex: 3 / 4,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f57542",
  },
  titreText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "snow",
  },
  btnView: {
    flex: 1 / 4,
    backgroundColor: "snow",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTouche: {
    padding: 10,
    margin: 5,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  btnText: { fontSize: 15, fontWeight: "bold", color: "snow" },
});
export default Acceuil;
