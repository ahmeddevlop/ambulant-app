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
import { Searchbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { articlesListe } from "../../slices/articleSlice";
import Article from "../article/Article";
import { creerCommande } from "../../slices/commandeSlice";
import chariotSlice, { revertChariot } from "../../slices/chariotSlice";
import { useIsFocused } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { achatListeAction, creerAchat } from "../../slices/achatSlice";
const AchatLance = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [rech, setRech] = useState("");
  const artListe = useSelector((state) => state.article);
  const { articles, loading, erreur } = artListe;
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const [artRech, setArtRech] = useState([]);
  const achCreer = useSelector((state) => state.achat);
  const frn = useSelector((state) => state.fournisseur);
  const { fournisseurActuelle } = frn;
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  const lien = "https://gestpro.globalsystempro.com";
  const createPDF = async () => {
    const html = `
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    
    </head>
    <body>
    <div style=" display:'flex',flexDirection:'column'">
      <h1>Nom Société:${societeActuelle.nom_soc}</h1>
      <h1>Code Société:${societeActuelle.code_soc}</h1>
      <h1>Nom Fournisseur:${fournisseurActuelle.nom_frn}</h1>
      <h1>Code Fournisseur:${fournisseurActuelle.code_frn}</h1>
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
         <img style="
                    width: 140;
                    height: 120;
                    border-radius: 25;
                    margin-left: 3;
                    flex: 1/4;"
                  }} src=${lien + item.image}></img>
                  <div style=" backgroud-color: #fff; flex: 1/4 ;">
                <h1
                  style="
                    margin-left: 0;
                    margin-top: 15;
                    width: 130;
                    color: rgb(0,120,212);
                  "
                >
                  ${item.nom}
                </h1>
              </div>
              <div style=" backgroud-color: #fff; flex: 0.5; ">
                <h1
                  style="
                    margin-left: 70;
                    margin-top: 15;
                  "
                >
                  ${item.qty}
                </h1>
                </div>
              <div style=" backgroud-color: #fff; flex: 1; ">
                <h1
                  style="
                    margin-left: 80;
                    margin-top: 15;
                  "
                >
                  ${(item.prix * item.qty).toFixed(3)} DT
                </h1>
              </div>
              
                </div>`
       )}
      </div>
      <div style=" display:'flex',flexDirection:'column'">
      <h1>Prix Totale:${chariotListe
        .reduce((acc, i) => acc + i.prix * i.qty, 0)
        .toFixed(3)}DT</h1>
    </div>

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
    setArtRech([]);
    if (rech.length == 0) {
      dispatch(articlesListe());
    }
    if (rech.length != 0) {
      articles?.articles?.map(
        (artF) =>
          artF.nom.toUpperCase().includes(rech.toUpperCase()) &&
          setArtRech((artRech) => [...artRech, artF])
      );
    }
    console.log(artRech[0]);
  }, [rech, fournisseurActuelle, isFocused]);
  const commandeHandler = () => {
    if (Object.keys(fournisseurActuelle).length != 0) {
      dispatch(
        creerAchat({
          chariotListe,
          nom_soc: societeActuelle.nom_soc,
          code_soc: societeActuelle.code_soc,
          societe: societeActuelle._id,
          articlesPrix: chariotListe
            ?.reduce((acc, i) => acc + i.prix_achat * i.qty, 0)
            .toFixed(3),
          totalePrix: chariotListe
            ?.reduce((acc, i) => acc + i.prix_achat * i.qty, 0)
            .toFixed(3),
          date_livraison: new Date(),
          fournisseur: fournisseurActuelle._id,
          code_frn: fournisseurActuelle.code_frn,
          nom_frn: fournisseurActuelle.nom_frn,
        })
      );

      alert("Achat Crée avec succés!");
      createPDF();
      dispatch(revertChariot());
    } else {
      alert("Il faut Choisir Un Fournisseur!");
    }
  };
  return (
    <KeyboardAvoidingView style={style.main}>
      <View style={style.blockCmd}>
        <TouchableOpacity
          style={{
            backgroundColor: chariotListe.length != 0 ? "#16ab36" : "#77f788",
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
            <Text style={style.cmdText}>
              Charger:
              {chariotListe
                ?.reduce((acc, i) => acc + i.prix_achat * i.qty, 0)
                .toFixed(3)}
              DT
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1 / 2,
            }}
          >
            {fournisseurActuelle && (
              <Text style={style.cmdText}>
                Fournisseur:{fournisseurActuelle.nom_frn}
              </Text>
            )}
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

      <ScrollView style={style.blockArt}>
        {rech.length != 0
          ? artRech?.map((a) => (
              <View>
                <Article article={a} source="vente" />
              </View>
            ))
          : articles?.articles?.map((a) => (
              <View>
                <Article article={a} source="vente" />
              </View>
            ))}
      </ScrollView>
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
    fontWeight: "bold",
    color: "snow",
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
export default AchatLance;
