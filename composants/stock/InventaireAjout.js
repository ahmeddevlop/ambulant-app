import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Portal, Searchbar, ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { articlesListe } from "../../slices/articleSlice";
import Article from "../article/Article";
import { creerCommande } from "../../slices/commandeSlice";
import chariotSlice, { revertChariot } from "../../slices/chariotSlice";
import { useIsFocused } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useFonts } from "expo-font";
import { FlashList } from "@shopify/flash-list";
import Inventaire from "./Inventaire";
import {
  inventairesListeAction,
  creerInventaire,
} from "../../slices/inventaireSlice";

const InventaireAjout = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [rech, setRech] = useState("");
  const artListe = useSelector((state) => state.article);
  const { articles, loading, erreur } = artListe;
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const [artRech, setArtRech] = useState([]);
  const commCreer = useSelector((state) => state.commande);
  const cli = useSelector((state) => state.client);
  const { clientActuelle } = cli;
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  const [load, setLoad] = useState(false);
  const lien = "https://gestpro.globalsystempro.com";
  const invListe = useSelector((state) => state.inventaire);
  const { inventaires } = invListe;

  const createPDF = async () => {
    const html = `
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    
    </head>
    <body style="padding:30;justify-content:center;">
    <div style="display:flex;flex-direction:row;justify-content:space-between;">
    
      <h1 style="font-size:40;font-weight:bold;">Société:${
        societeActuelle.nom_soc
      }</h1>
   
    <div style=" display:flex;flex-direction:column;">      
      <h1 style="font-size:40;font-weight:bold;">Nom Client:${
        clientActuelle.nom_cli
      }</h1>
      <h1 style="font-size:40;font-weight:bold;">Code Client:${
        clientActuelle.cod_cli
      }</h1>
      <h1 style="font-size:40;font-weight:bold;">Date Livraison:${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}</h1>
    </div>
    </div>
    <div style=" display: 'flex',
        flexDirection: 'column',
        flexGrow: 1 ">
        <div style=" flex: 1 / 5; background-color: #fff;flex-direction:row;flex-wrap:wrap ">
    
          <div style="flex:1/5;">
      <h1>Articles Commandée</h1>
       ${chariotListe.map(
         (item, i) => `
        <div style="display:flex;flex-direction:row;">
         
                  <div style=" backgroud-color: #fff; flex: 1/4 ;">
                <h1
                  style="
                    margin-left: 0;
                    margin-top: 15;
                    width: 130;
                    color: rgb(0,120,212);font-size:40;font-weight:bold;
                  "
                >
                  ${item.nom}
                </h1>
              </div>
              <div style=" backgroud-color: #fff; flex: 0.5; ">
                <h1
                  style="
                    margin-left: 70;
                    margin-top: 15;font-size:40;font-weight:bold;
                  "
                >
                  ${item.qty}
                </h1>
                </div>
              <div style=" backgroud-color: #fff; flex: 1; ">
                <h1
                  style="
                    margin-left: 80;
                    margin-top: 15;font-size:40;font-weight:bold;
                  "
                >
                  ${(item.prix * item.qty).toFixed(3)} DT
                </h1>
              </div>
              
                </div>`
       )}
      </div>
  
      <h1 style="font-size:50;font-weight:bold;justify-self:end;padding:10;">Prix Totale:${chariotListe
        .reduce((acc, i) => acc + i.prix * i.qty, 0)
        .toFixed(3)}DT</h1>
 

        </div>
      </body>
      </html>`;

    const { uri } = await Print.printToFileAsync({
      html,
    });
    console.log("File has been saved to:", uri);

    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };
  useEffect(() => {
    dispatch(inventairesListeAction());
    console.log(inventaires);
    setArtRech([]);
    if (rech.length == 0) {
      dispatch(articlesListe());
    }
    if (rech.length != 0) {
      setLoad(true);
      articles?.articles?.map(
        (artF) =>
          artF.nom.toUpperCase().includes(rech.toUpperCase()) &&
          setArtRech((artRech) => [...artRech, artF])
      );
      setLoad(false);
    }
  }, [rech, clientActuelle, isFocused]);
  const commandeHandler = () => {
    if (chariotListe.length != 0) {
      dispatch(
        creerInventaire({
          chariotListe,
          nom_soc: societeActuelle.nom_soc,
          code_soc: societeActuelle.code_soc,
          societe: societeActuelle._id,

          totalePrix: chariotListe
            ?.reduce((acc, i) => acc + i.prix_achat * i.qty, 0)
            .toFixed(3),
          date_inv: new Date(),
        })
      );

      alert("Inventaire Crée avec succés!");
      //createPDF();
      dispatch(revertChariot());
    } else {
      alert("Il faut Choisir Un ou Plusieurs Articles!");
    }
  };
  const renderItem = (a) => {
    return (
      <View>
        <Article article={a.item} source="vente" navigation={navigation} />
      </View>
    );
  };
  const getItemLayout = (data, index) => ({
    length: 394.6666564941406,
    offset: 394.6666564941406 * index,
    index,
  });
  const keyExtractor = (item) => item._id;

  return (
    <KeyboardAvoidingView style={style.main}>
      <View style={style.blockCmd}>
        <TouchableOpacity
          style={{
            //backgroundColor: "red",
            backgroundColor: chariotListe.length != 0 ? "#2FB641" : "#04bfd4",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
          }}
          disabled={chariotListe?.length == 0}
          onPress={commandeHandler}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1 / 2,
            }}
          >
            <Text style={style.cmdText}>Charger</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1 / 2,
            }}
          >
            <Text style={style.cmdText}>
              Date:{new Date().getDate()}/{new Date().getMonth() + 1}/
              {new Date().getFullYear()}
            </Text>
            <Text style={style.cmdText}>
              Numéro:{inventaires && inventaires?.length + 1}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.blockRech}>
        <Searchbar
          defaultValue={rech}
          onChangeText={(txt) => setRech(txt)}
          placeholder="Recherche article"
          mode="view"
        />
      </View>

      <View style={style.blockArt}>
        {loading || load ? (
          <ActivityIndicator size={"large"} style={{ marginTop: 10 }} />
        ) : rech.length != 0 ? (
          <FlashList
            estimatedItemSize={1000}
            data={artRech}
            numColumns={1}
            removeClippedSubviews={true}
            maxToRenderPerBatch={20}
            initialNumToRender={20}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            keyExtractor={keyExtractor}
          />
        ) : (
          <FlashList
            estimatedItemSize={1000}
            data={articles?.articles}
            numColumns={1}
            removeClippedSubviews={true}
            maxToRenderPerBatch={20}
            initialNumToRender={20}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  //BlockCmd
  blockCmd: {
    flex: 1.5 / 10,
    backgroundColor: "snow",
    padding: 10,
  },

  cmdText: {
    fontSize: 16,
    //fontWeight: "bold",
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
  },
  //Fin BlockCmd
  //Block rech
  blockRech: {
    flex: 1 / 10,

    marginTop: 1,
    marginBottom: 10,
  },

  //Fin Block rech
  blockArt: {
    flex: 7.5 / 10,
    marginTop: 25,
  },
});
export default InventaireAjout;
