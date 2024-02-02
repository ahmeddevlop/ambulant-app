import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Acceuil = ({ navigation }) => {
  return (
    <View style={{ flex: 1, display: "flex" }}>
      <View style={style.titreView}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../composants/Image/acceuil.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              margin: 30,
            }}
          />
        </View>
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
    backgroundColor: "#07d934",
    width: "70%",
    borderRadius: 10,
  },
  btnText: { fontSize: 15, fontWeight: "bold", color: "snow" },
});
export default Acceuil;
