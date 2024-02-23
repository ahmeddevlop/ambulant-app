import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { creerCommande } from "../../slices/commandeSlice";
import { SuppChariot, revertChariot } from "../../slices/chariotSlice";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
const ChariotMain = ({ navigation }) => {
  const dispatch = useDispatch();
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const commCreer = useSelector((state) => state.commande);
  const url = "https://gestpro.globalsystempro.com";
  const cli = useSelector((state) => state.client);
  const { clientActuelle } = cli;
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  useEffect(() => {
    console.log(chariotListe);
  }, []);
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
   
    <div style=" display:flex;flex-direction:column;justify-content:flex-end">      
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
  const commandeHandler = () => {
    if (Object.keys(clientActuelle).length != 0) {
      dispatch(
        creerCommande({
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
          client: clientActuelle._id,
          cod_cli: clientActuelle.cod_cli,
          nom_cli: clientActuelle.nom_cli,
        })
      );

      alert("Commande Crée avec succés!");
      createPDF();
      dispatch(revertChariot());
      navigation.navigate("VenteAcceuil");
    } else {
      alert("Il faut Choisir Un Client!");
    }
  };
  const suppHandler = (art) => {
    dispatch(SuppChariot(art.article));
  };
  return (
    <View style={{ flex: 1, display: "flex" }}>
      <View style={style.blockCmd}>
        <TouchableOpacity
          style={{
            backgroundColor: chariotListe.length != 0 ? "#2FB641" : "#04bfd4",
            height: "100%",
            // alignItems: "center",
            // justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            padding: 10,
          }}
          disabled={chariotListe?.length == 0}
          onPress={commandeHandler}
        >
          <View
            style={{
              //justifyContent: "center",
              //alignItems: "center",
              flex: 1 / 2,
            }}
          >
            <Text style={style.cmdText}>
              Totale :
              {chariotListe
                ?.reduce((acc, i) => acc + i.prix_achat * i.qty, 0)
                .toFixed(3)}
              DT
            </Text>
          </View>
          <View
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              flex: 1 / 2,
            }}
          >
            {clientActuelle && (
              <Text style={style.cmdText}>Client:{clientActuelle.nom_cli}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 8 / 10 }}>
        {chariotListe.map((art) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              padding: 15,
              backgroundColor: "snow",
            }}
          >
            <Image
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                flex: 0.75 / 4,
                alignSelf: "center",
              }}
              source={{ uri: url + art.image }}
            />
            <Text
              style={{
                flex: 2 / 4,
                fontSize: 18,
                verticalAlign: "middle",
                marginLeft: 5,
              }}
            >
              {art.nom} * {art.qty}
            </Text>
            <Text
              style={{
                flex: 1 / 3,
                fontSize: 18,
                verticalAlign: "middle",
                marginLeft: 5,
              }}
            >
              {Number(art.prix_achat).toFixed(3)}DT
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                backgroundColor: "red",
                flex: 0.5 / 4,
              }}
              onPress={() => suppHandler(art)}
            >
              <FontAwesomeIcon
                size={18}
                icon={faTrashCan}
                color="snow"
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  //BlockCmd
  blockCmd: {
    //flex: 5 / 10,
    flex: 1.5 / 10,
    backgroundColor: "snow",
    padding: 10,
  },
  cmdTouche: {
    backgroundColor: "#16ab36",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cmdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "snow",
  },
  //Fin BlockCmd
});
export default ChariotMain;
