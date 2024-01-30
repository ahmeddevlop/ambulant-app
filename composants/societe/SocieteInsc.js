// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from "react";
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
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import Loader from "../Loader";
import axios from "redaxios";
import { societeCreeAction } from "../../slices/societeSlice";
const SocieteInsc = (props) => {
  const dispatch = useDispatch();
  const [cod_soc, setCodSoc] = useState("");
  const [nom_soc, setNomSoc] = useState("");
  const [adr_soc, setAdrSoc] = useState("");
  const [mdp_soc, setMdpSoc] = useState("");
  const [tel_soc, setTel] = useState(0);
  const [abrv_soc, setAbrv] = useState("");

  const [image, setImage] = useState(null);
  const [imgObj, setImgObj] = useState(null);
  const [errortext, setErrortext] = useState("");
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  const [loadImg, setLoadImg] = useState(false);
  const socCree = useSelector((state) => state.societe);
  const { loading, erreur, societeCree } = socCree;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImgObj(result);
    }
  };
  const createFormData = () => {
    const fileName = imgObj.assets[0].uri.split("/").pop();
    const fileType = fileName.split(".").pop();

    const formData = new FormData();
    formData.append("file", {
      uri: imgObj.assets[0].uri,
      name: cod_soc + "." + fileType,
      type: `image/${fileType}`,
    });

    return formData;
  };
  const handleUploadPhoto = async () => {
    setLoadImg(true);

    if (!image) {
      setLoadImg(false);
      return "/uploads/img_default.png";
    } else {
      const config = { headers: { "Content-type": "multipart/form-data" } };
      let body = createFormData();
      const { data } = await axios.post(`${uri}/api/uploadSftp`, body, config);
      setLoadImg(false);

      return data;
    }
  };
  const handleSubmitButton = async () => {
    setErrortext("");

    let imgServ = await handleUploadPhoto();

    dispatch(
      societeCreeAction({
        code_soc: cod_soc,
        nom_soc,
        adr_soc,
        mdp_soc,
        tel_soc,
        abrv_soc,
        logo_soc: imgServ,
        active: false,
        date_demande: new Date(),
      })
    );
    if (erreur) {
      setErrortext(erreur);
    }
  };

  if (Object.keys(societeCree).length != 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F5680A",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../Image/success.png")}
          style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
        />
        <Text style={styles.successTextStyle}>
          Demande enregistré avec succés!.
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("SocieteLogin")}
        >
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
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
              onChangeText={(cod_soc) => setCodSoc(cod_soc)}
              underlineColorAndroid="#f000"
              placeholder="Code Société"
              placeholderTextColor="snow"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(nom_soc) => setNomSoc(nom_soc)}
              underlineColorAndroid="#f000"
              placeholder="Nom Société"
              placeholderTextColor="snow"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(abrv_soc) => setAbrv(abrv_soc)}
              underlineColorAndroid="#f000"
              placeholder="Abreviation Société"
              placeholderTextColor="snow"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(tel_soc) => setTel(nom_soc)}
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
              onChangeText={(adr_soc) => setAdrSoc(adr_soc)}
              underlineColorAndroid="#f000"
              placeholder="Adresse"
              placeholderTextColor="snow"
              returnKeyType="next"
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
          <View>
            <Button
              icon="camera"
              onPress={pickImage}
              disabled={loadImg || loading}
              textColor="snow"
              style={styles.buttonStyle}
            >
              {image ? "" : "Choisir une image!"}
            </Button>
            {image && (
              <View>
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, alignSelf: "center" }}
                />
                <Button
                  icon="minus"
                  onPress={() => setImage(null)}
                  textColor="snow"
                  style={styles.buttonStyle}
                >
                  Retirer
                </Button>
              </View>
            )}
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>Inscription</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default SocieteInsc;

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
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
