// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import Loader from "../Loader";
import axios from "redaxios";
import { logout, societeAuth } from "../../slices/societeSlice";
import { useIsFocused } from "@react-navigation/native";
const SocieteLogin = (props) => {
  const dispatch = useDispatch();

  const [mdp_soc, setMdpSoc] = useState("");
  const [tel_soc, setTel] = useState(0);

  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const socAct = useSelector((state) => state.societe);
  const { loading, erreur, societeActuelle } = socAct;
  const isFocused = useIsFocused();
  const handleSubmitButton = async () => {
    setErrortext("");
    dispatch(
      societeAuth({
        mdp_soc,
        tel_soc,
      })
    );

    console.log(erreur);
    if (erreur != "") {
      alert(erreur);
    }
  };
  useEffect(() => {
    if (
      Object.keys(societeActuelle).length != 0 &&
      societeActuelle.active == true
    ) {
      props.navigation.navigate("Drawer");
    }
  }, [isFocused]);
  if (Object?.keys(societeActuelle)?.length != 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F5680A",
          justifyContent: "center",
        }}
      >
        {societeActuelle?.active == true ? (
          props.navigation.navigate("Drawer")
        ) : (
          <View>
            <Image
              source={require("../Image/echec.jpeg")}
              style={{
                height: 150,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
            <Text style={styles.successTextStyle}>
              Ce Sociéte n'set pas Activé!
            </Text>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => dispatch(logout())}
            >
              <Text style={styles.buttonTextStyle}>Retour</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#F5680A" }}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../Image/aboutreact.png")}
            style={{
              width: "50%",
              height: 100,
              resizeMode: "contain",
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(tel_soc) => setTel(tel_soc)}
              underlineColorAndroid="#f000"
              placeholder="Numéro téléphone"
              placeholderTextColor="snow"
              returnKeyType="next"
              keyboardType="numeric"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(mdp_soc) => setMdpSoc(mdp_soc)}
              underlineColorAndroid="#f000"
              placeholder="Mot de passe"
              placeholderTextColor="snow"
              autoCapitalize="sentences"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>

          {errortext != "" ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default SocieteLogin;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
    backgroundColor: "snow",
    padding: 10,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
