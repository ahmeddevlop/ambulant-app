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
import Article from "./Article";
import { creerCommande } from "../../slices/commandeSlice";
import chariotSlice, { revertChariot } from "../../slices/chariotSlice";
import { useIsFocused } from "@react-navigation/native";
const VenteAcceuil = () => {
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

  useEffect(() => {
    console.log("cli actuelle c ");
    console.log(clientActuelle);
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
  }, [rech, clientActuelle, isFocused]);
  const commandeHandler = () => {
    if (Object.keys(clientActuelle).length != 0) {
      dispatch(
        creerCommande({
          chariotListe,
          nom_soc: societeActuelle.nom_soc,
          code_soc: societeActuelle.code_soc,
          societe: societeActuelle._id,
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
                ?.reduce((acc, i) => acc + i.prix * i.qty, 0)
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
            {clientActuelle && (
              <Text style={style.cmdText}>Client:{clientActuelle.nom_cli}</Text>
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
export default VenteAcceuil;
