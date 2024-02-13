import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

import axios from "redaxios";
import { clientCree } from "../../slices/clientSlice";
import { ScrollView } from "react-native-gesture-handler";
const ClientCree = () => {
  const dispatch = useDispatch();
  const [cod_cli, setCodeCli] = useState("");
  const [nom_cli, setNomCli] = useState("");
  const [abrv_cli, setAbrv] = useState("");
  const [cin, setCin] = useState(0);
  const [image, setImage] = useState(null);
  const [imgObj, setImgObj] = useState(null);

  const [adr_cli, setAdr] = useState("");
  const [ville_cli, setVille] = useState("");
  const [loadImg, setLoadImg] = useState(false);
  const [tel_cli, setTel] = useState(0);
  const [cod_tarif, setCodeTarif] = useState("");
  const [cod_tva, setCodeTva] = useState("");

  const clientC = useSelector((state) => state.client);
  const { client, loading, erreur } = clientC;

  //const uri = "http://192.168.1.21:5050";
  const uri = "https://gestpro.globalsystempro.com/back_3";
  useEffect(() => {}, []);
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
      name: cod_cli + "." + fileType,
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
  const articleAjout = async () => {
    if (
      cod_cli == "" ||
      nom_cli == "" ||
      cin == 0 ||
      cod_tva == 0 ||
      tel_cli == 0
    ) {
      alert("Il faut remplir tous les champs!");
    } else {
      try {
        let imgServ = await handleUploadPhoto();

        dispatch(
          clientCree({
            cod_cli,
            nom_cli,
            cin,
            adr_cli,
            abrv_cli,
            tel_cli,
            cod_tva,
            image: imgServ,
            ville_cli,
            cod_tarif,
            cod_tva,
            photo_cli: imgServ,
            societe: "65a8e394bd319d1efbd07f7f",
            code_soc: "04",
          })
        );

        alert("Client Crée avec Succés!");
        /*setCodeArt("");
          setLibArt("");
          setPua(0);
          setPuv(0);
          setStock(0);
          setCodeBar("");
          setImage(null);
          setFam("");*/
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 5 }}>
      <ScrollView>
        <TextInput
          label="Code Client"
          value={cod_cli}
          onChangeText={(txt) => setCodeCli(txt)}
          style={style.input}
        />

        <TextInput
          label="Nom"
          value={nom_cli}
          onChangeText={(txt) => setNomCli(txt)}
          style={style.input}
        />
        <TextInput
          label="Numero identité"
          value={cin}
          onChangeText={(txt) => setCin(txt)}
          keyboardType="numeric"
          style={style.input}
          maxLength={8}
        />
        <TextInput
          label="Abreviation client"
          value={abrv_cli}
          onChangeText={(txt) => setAbrv(txt)}
          keyboardType="numeric"
          style={style.input}
        />
        <TextInput
          label="Numero Téléphone"
          value={tel_cli}
          onChangeText={(txt) => setTel(txt)}
          keyboardType="numeric"
          style={style.input}
        />
        <TextInput
          label="Adresse"
          value={adr_cli}
          onChangeText={(txt) => setAdr(txt)}
          style={style.input}
        />
        <TextInput
          label="Ville"
          value={ville_cli}
          onChangeText={(txt) => setVille(txt)}
          style={style.input}
        />
        <TextInput
          label="TVA"
          value={cod_tva}
          onChangeText={(txt) => setCodeTva(txt)}
          style={style.input}
        />
        <View>
          <Button
            icon="camera"
            onPress={pickImage}
            disabled={loadImg || loading}
          >
            {image ? "" : "Choisir une image!"}
          </Button>
          {image && (
            <View>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
              <Button icon="minus" onPress={() => setImage(null)}>
                Retirer
              </Button>
            </View>
          )}
          <Button
            icon="plus"
            onPress={articleAjout}
            loading={loadImg}
            disabled={loadImg || loading}
          >
            Ajout Client
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  input: {
    marginBottom: 5,
  },
});
export default ClientCree;
