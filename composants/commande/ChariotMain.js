import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { creerCommande } from "../../slices/commandeSlice";
import { revertChariot } from "../../slices/chariotSlice";
const ChariotMain = () => {
  const dispatch = useDispatch();
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const commCreer = useSelector((state) => state.commande);
  const url = "https://gestpro.globalsystempro.com";
  const cli = useSelector((state) => state.client);
  const { clientActuelle } = cli;
  useEffect(() => {
    console.log(chariotListe);
  }, []);
  const commandeHandler = () => {
    if (Object.keys(clientActuelle).length != 0) {
      dispatch(
        creerCommande({
          chariotListe,
          nom_soc: "STE AMB",
          code_soc: "04",
          societe: "65a8e394bd319d1efbd07f7f",
          articlesPrix: chariotListe
            ?.reduce((acc, i) => acc + i.prix * i.qty, 0)
            .toFixed(3),
          totalePrix: chariotListe
            ?.reduce((acc, i) => acc + i.prix * i.qty, 0)
            .toFixed(3),
          date_livraison: new Date(),
          client: clientActuelle._id,
          cod_cli: clientActuelle.cod_cli,
          nom_cli: clientActuelle.nom_cli,
        })
      );

      alert("Commande Crée avec succés!");
      dispatch(revertChariot());
    } else {
      alert("Il faut Choisir Un Client!");
    }
  };
  return (
    <View style={{ flex: 1 }}>
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
              flex: 0.5 / 3,
              alignSelf: "center",
            }}
            source={{ uri: url + art.image }}
          />
          <Text
            style={{
              flex: 1 / 3,
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
            {Number(art.prix).toFixed(3)}DT
          </Text>
        </View>
      ))}
      <View style={style.blockCmd}>
        <TouchableOpacity
          style={{
            backgroundColor: chariotListe.length != 0 ? "#16ab36" : "#77f788",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={chariotListe?.length == 0}
          onPress={commandeHandler}
        >
          <Text style={style.cmdText}>Charger</Text>
          <Text style={style.cmdText}>
            {chariotListe
              ?.reduce((acc, i) => acc + i.prix * i.qty, 0)
              .toFixed(3)}
            DT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  //BlockCmd
  blockCmd: {
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
