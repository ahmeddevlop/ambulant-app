import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "redaxios";
//import { openDatabase } from "react-native-sqlite-storage";
//import SQLite from "react-native-sqlite";
import { familleCree } from "../../slices/familleSlice";

const FamilleCree = () => {
  const dispatch = useDispatch();
  //const db = SQLite.openDatabase("test.db");
  const [code_fam, setCodeFam] = useState("");
  const [lib_fam, setLibFam] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imgObj, setImgObj] = useState(null);
  const [loadImg, setLoadImg] = useState(false);
  const famCree = useSelector((state) => state.famille);
  const { famille, loading, erreur } = famCree;
  const uri = "http://192.168.1.21:5050";
  useEffect(() => {}, []);
  /*const dbLoc = async () => {
    const db = await SQLite.openDatabaseAsync("databaseName");
    console.log(db);
  };*/
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
    try {
      const config = { headers: { "Content-type": "multipart/form-data" } };
      let body = createFormData();
      const { data } = await axios.post(`${uri}/api/uploadSftp`, body, config);
      setLoadImg(false);

      return data;
    } catch (error) {
      alert(error);
      setLoadImg(false);
    }
  };
  const famileAjout = async () => {
    if (code_fam == "" || lib_fam == "" || description == "") {
      alert("Il faut remplir tous les champs!");
      console.log(code_fam, lib_fam, description);
    } else {
      try {
        let imgServ = await handleUploadPhoto();
        console.log(imgServ);
        /*new Promise((resolve, reject) => {
          db.transaction(function (tx) {
            tx.executeSql(
              "create table if not exists famille(id INTEGER PRIMARY KEY NOT NULL,code_fam text,lib_fam text,description text,image text)",
              null,
              function () {
                resolve(true);
                console.log("Tableau cree avec succés!");
              },
              function (tx, error) {
                reject(error.message);
              }
            );
          });
          db.transaction(function (tx) {
            tx.executeSql(
              `insert into famille(code_fam,lib_fam,description,image) values('${code_fam}','${lib_fam}','${description}','${imgObj.assets[0].uri}')`,
              null,

              function () {
                resolve(true);
                console.log("Insertion faite avec succés!");
              },
              function (tx, error) {
                reject(error.message);
                console.log(error.message);
              }
            );
          });
          db.transaction(function (tx) {
            tx.executeSql(
              "select * from famille",
              null,
              function (txObj, resultset) {
                resolve(true);
                console.log(resultset.rows._array);
              },
              function (tx, error) {
                reject(error.message);
              }
            );
          });
        });*/

        dispatch(
          familleCree({
            code_fam,
            lib_fam,
            description,
            image: imgServ,
            societe: "65a8e394bd319d1efbd07f7f",
            code_soc: "04",
          })
        );

        alert("Famille Crée avec Succés!");
        setCodeFam("");
        setLibFam("");
        setDesc("");
        setImage(null);
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
        <Button icon="camera" onPress={pickImage} disabled={loadImg || loading}>
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
          Ajout Famille
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
export default FamilleCree;
