import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "redaxios";
import * as SQLite from "expo-sqlite";
import NetInfo from "@react-native-community/netinfo";
import { familleCree } from "../../slices/familleSlice";
import { famAjoutLoc, getDBConnection } from "../../slices/sqliteSlice";
const FamilleCree = () => {
  const dispatch = useDispatch();
  //const db = openDatabase("default.db");
  const [code_fam, setCodeFam] = useState("");
  const [lib_fam, setLibFam] = useState("");
  const [description, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [imgObj, setImgObj] = useState(null);
  const [loadImg, setLoadImg] = useState(false);
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [reseau, setReseau] = useState(false);
  const famCree = useSelector((state) => state.famille);
  const { famille, loading, erreur } = famCree;
  //const dbState = useSelector((state) => state.SQLiteState);
  //const { db, erreur: errDB } = famCree;
  const uri = "http://192.168.1.21:5050";
  //var db = openDatabase({ name: "test.db", location: "default" });

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (state.isConnected) {
        alert("en ligne");
        setReseau(true);
      } else {
        alert("hors ligne");
        setReseau(false);
      }
    });
  }, [famileAjout, db]);

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
        if (reseau) {
          //Cas en ligne
          let imgServ = await handleUploadPhoto();
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
          db.transaction((tx) => {
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS familles (id INTEGER PRIMARY KEY AUTOINCREMENT, lib_fam TEXT,code_fam TEXT,description TEXT,image TEXT,societe TEXT,code_soc TEXT,synchro CHAR default 'N' )",
              null,
              (txObj, resultSet) => console.log("tab famille crée avec succés!")
            );
          });
          db.transaction((tx) => {
            tx.executeSql(
              `INSERT INTO familles (code_fam,lib_fam,description,image,societe,code_soc,synchro) values ('${code_fam}',
            '${lib_fam}',
            '${description}',
            '${image}',
            '65a8e394bd319d1efbd07f7f',
            '04','O')`,
              null,
              (txObj, resultSet) => console.log("ajout terminé avec succés!")
            );
          });
        } else {
          //Cas Hors-ligne
          db.transaction((tx) => {
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS familles (id INTEGER PRIMARY KEY AUTOINCREMENT, lib_fam TEXT,code_fam TEXT,description TEXT,image TEXT,societe TEXT,code_soc TEXT,synchro CHAR default 'N')",
              null,
              (txObj, resultSet) => console.log("tab famille crée avec succés!")
            );
          });
          db.transaction((tx) => {
            tx.executeSql(
              `INSERT INTO familles (code_fam,lib_fam,description,image,societe,code_soc,synchro) values ('${code_fam}',
              '${lib_fam}',
              '${description}',
              '${image}',
              '65a8e394bd319d1efbd07f7f',
              '04','N')`,
              null,
              (txObj, resultSet) => console.log("ajout terminé avec succés!")
            );
          });
        }

        alert("Famille Crée avec Succés!");
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
