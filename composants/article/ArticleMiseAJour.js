import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextInput, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useIsFocused } from "@react-navigation/native";
import axios from "redaxios";
import { articleMajAction } from "../../slices/articleSlice";
import { familleListe } from "../../slices/familleSlice";
import { ScrollView } from "react-native-gesture-handler";
const ArticleMiseAJour = ({ route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const art = route.params.article;
  const url = "https://gestpro.globalsystempro.com";
  const [code_art, setCodeArt] = useState("");
  const [lib_art, setLibArt] = useState("");
  const [pua, setPua] = useState(0);
  const [puv, setPuv] = useState(0);
  const [image, setImage] = useState(null);
  const [imgObj, setImgObj] = useState(null);

  const [stock, setStock] = useState(0);
  const [code_bar, setCodeBar] = useState("");
  const [famille, setFam] = useState({});
  const [loadImg, setLoadImg] = useState(false);
  const [code_fam, setCodeFam] = useState("");
  const artC = useSelector((state) => state.article);
  const { article, loading, erreur } = artC;
  const famL = useSelector((state) => state.famille);
  const { familles } = famL;
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  //const uri = "http://192.168.1.21:5050";
  const uri = "https://gestpro.globalsystempro.com/back_3";
  useEffect(() => {
    dispatch(familleListe());
    console.log(art.code_bar);
    setCodeArt(art.code_art);
    setLibArt(art.nom);
    setPua(art.prix_achat);
    setPuv(art.prix_1);
    setImage(url + art.image);
    setImgObj(null);

    setStock(art.num_stock);
    setCodeBar(art.code_bar);
    setFam(familles.find((f) => f._id == art.famille));

    setCodeFam(art.code_fam);
  }, [isFocused]);
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
      name: code_art + "." + fileType,
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
  const articleMaj = async () => {
    console.log(famille);
    if (
      code_art == "" ||
      lib_art == "" ||
      pua == 0 ||
      puv == 0 ||
      image == null ||
      stock == 0 ||
      Object.keys(famille).length == 0
    ) {
      alert("Il faut remplir tous les champs!");
    } else {
      try {
        let imgServ = await handleUploadPhoto();
        console.log(imgServ);
        dispatch(
          articleMajAction({
            _id: art._id,
            code_art,
            nom: lib_art,
            prix_achat: pua,
            prix_1: puv,
            num_stock: stock,
            code_bar,
            image: imgServ,
            famille: famille._id,
            code_fam: famille.code_fam,
            societe: societeActuelle._id,
            code_soc: societeActuelle.code_soc,
          })
        );

        if (!erreur) {
          alert("Mise a jour terminé avec Succés!");
          /*setCodeArt("");
          setLibArt("");
          setPua(0);
          setPuv(0);
          setStock(0);
          setCodeBar("");
          setImage(null);
          setFam("");*/
        } else {
          alert(erreur);
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, padding: 5 }}>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "snow",
          }}
        >
          <Text style={{ fontSize: 18, flex: 1 / 4, verticalAlign: "middle" }}>
            Famille
          </Text>
          <Picker
            selectedValue={famille}
            onValueChange={(itemValue, itemIndex) => setFam(itemValue)}
            style={{ flex: 3 / 4 }}
          >
            <Picker.Item
              label="Choisir une Famille SVP"
              value={familles.find((f) => f._id === art.famille)}
            />
            {familles &&
              familles.map((f) => <Picker.Item label={f.lib_fam} value={f} />)}
          </Picker>
        </View>
        <TextInput
          label="Code Article:"
          value={code_art}
          onChangeText={(txt) => setCodeArt(txt)}
          style={style.input}
        />

        <TextInput
          label="Libelle:"
          value={lib_art}
          onChangeText={(txt) => setLibArt(txt)}
          style={style.input}
        />
        <TextInput
          label={"Prix Achat:" + pua}
          value={pua}
          onChangeText={(txt) => setPua(txt)}
          keyboardType="numeric"
          style={style.input}
        />
        <TextInput
          label={"Prix Vente:" + puv}
          value={puv}
          onChangeText={(txt) => setPuv(txt)}
          keyboardType="numeric"
          style={style.input}
        />
        <TextInput
          label={"Stock:" + stock}
          value={stock}
          onChangeText={(txt) => setStock(txt)}
          keyboardType="numeric"
          style={style.input}
        />
        <TextInput
          label={"Code Bar:" + code_bar}
          value={code_bar}
          onChangeText={(txt) => setCodeBar(txt)}
          style={style.input}
          keyboardType="numeric"
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
            onPress={articleMaj}
            loading={loadImg}
            disabled={loadImg || loading}
          >
            Mise A Jour Article
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
export default ArticleMiseAJour;
