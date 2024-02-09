import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "redaxios";

import { familleUpdateAction } from "../../slices/familleSlice";
const FamilleMiseAJour = ({ route }) => {
  const dispatch = useDispatch();
  //const db = openDatabase("default.db");
  const [code_fam, setCodeFam] = useState("");
  const [lib_fam, setLibFam] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imgObj, setImgObj] = useState(null);
  const [loadImg, setLoadImg] = useState(false);

  const famCree = useSelector((state) => state.famille);
  const { famille, loading, erreur } = famCree;
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  //const dbState = useSelector((state) => state.SQLiteState);
  //const { db, erreur: errDB } = famCree;
  const uri = "http://192.168.1.21:5050";
  const url = "https://gestpro.globalsystempro.com";
  let fam = route.params.famille;

  useEffect(() => {
    setCodeFam(fam.code_fam);
    setLibFam(fam.lib_fam);
    setDesc(fam.description);
    setImage(url + fam.image);
  }, []);

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
      name: code_fam + "." + fileType,
      type: `image/${fileType}`,
    });

    return formData;
  };
  const handleUploadPhoto = async () => {
    setLoadImg(true);

    if (!imgObj) {
      setLoadImg(false);
      return "/uploads/" + image.split("/").pop();
    } else {
      const config = { headers: { "Content-type": "multipart/form-data" } };
      let body = createFormData();
      const { data } = await axios.post(`${uri}/api/uploadSftp`, body, config);
      setLoadImg(false);

      return data;
    }
  };
  const famileAjout = async () => {
    if (code_fam == "" || lib_fam == "" || description == "") {
      alert("Il faut remplir tous les champs!");
      console.log(code_fam, lib_fam, description);
    } else {
      try {
        //Cas en ligne
        let imgServ = await handleUploadPhoto();
        dispatch(
          familleUpdateAction({
            _id: fam._id,
            code_fam,
            lib_fam,
            description,
            image: imgServ,
          })
        );

        alert("Mise A Jour Famille est terminé avec Succés!");
        //setCodeFam("");
        //setLibFam("");
        //setDesc("");
        //setImage(null);
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <View style={{ flex: 1, padding: 5 }}>
      <TextInput
        label="Code Famille"
        value={code_fam}
        onChangeText={(txt) => setCodeFam(txt)}
        style={style.input}
      />

      <TextInput
        label="Libelle"
        value={lib_fam}
        onChangeText={(txt) => setLibFam(txt)}
        style={style.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={(txt) => setDesc(txt)}
        style={style.input}
      />
      <View>
        <Button
          icon="camera"
          onPress={() => pickImage()}
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
          onPress={famileAjout}
          loading={loadImg}
          disabled={loadImg || loading}
        >
          Mise A Jour Famille
        </Button>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  input: {
    marginBottom: 5,
  },
});
export default FamilleMiseAJour;
