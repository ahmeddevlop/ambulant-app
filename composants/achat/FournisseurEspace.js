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
import {
  fournisseurActuelleAction,
  fournisseurCree,
  fournisseursListe,
} from "../../slices/fournisseurSlice";
import { SearchBar, FAB, Modal, Portal } from "react-native-paper";
import Fournisseur from "./Fournisseur";
const FournisseurEspace = ({ navigation }) => {
  const dispatch = useDispatch();
  const [rech, setRech] = useState("");
  const [code_frn, setCodeFrn] = useState("");
  const [nom_frn, setNomFrn] = useState("");
  const [adr_frn, setAdrFrn] = useState("");
  const frnListe = useSelector((state) => state.fournisseur);
  const { fournisseurs, loading, erreur } = frnListe;

  const [frnRech, setFrnRech] = useState([]);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    alignSelf: "center",
  };
  const ajoutFrn = () => {
    dispatch(
      fournisseurCree({
        code_frn,
        nom_frn,
        adr_frn,
        societe: societeActuelle._id,
        code_soc: societeActuelle.code_soc,
        nom_soc: societeActuelle.nom_soc,
      })
    );
  };
  useEffect(() => {
    setFrnRech([]);
    if (rech.length == 0) {
      dispatch(fournisseursListe());
    }
    if (rech.length != 0) {
      fournisseurs.map(
        (f) =>
          f.nom_frn.toUpperCase().includes(rech.toUpperCase()) &&
          setFrnRech((frnRech) => [...frnRech, f])
      );
    }
  }, [rech]);

  return (
    <KeyboardAvoidingView style={style.main}>
      <View style={style.blockRech}>
        <Searchbar
          defaultValue={rech}
          onChangeText={(txt) => setRech(txt)}
          placeholder="Recherche Fournisseur"
          mode="view"
        />
      </View>
      <ScrollView>
        {rech == ""
          ? fournisseurs?.map((f) => (
              <TouchableOpacity
                onPress={() => dispatch(fournisseurActuelleAction(f))}
              >
                <Fournisseur fournisseur={f} />
              </TouchableOpacity>
            ))
          : frnRech?.map((f) => (
              <TouchableOpacity
                onPress={() => dispatch(fournisseurActuelleAction(f))}
              >
                <Fournisseur fournisseur={f} />
              </TouchableOpacity>
            ))}
      </ScrollView>
      <FAB
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        small
        icon="plus"
        onPress={showModal}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TextInput
            label="Code Fournisseur"
            value={code_frn}
            onChangeText={(txt) => setCodeFrn(txt)}
            style={style.input}
          />

          <TextInput
            label="Nom Fournisseur"
            value={nom_frn}
            onChangeText={(txt) => setNomFrn(txt)}
            style={style.input}
          />
          <TextInput
            label="Adresse Fournisseur"
            value={adr_frn}
            onChangeText={(txt) => setAdrFrn(txt)}
            style={style.input}
          />
          <Button
            icon="plus"
            onPress={ajoutFrn}
            loading={loading}
            disabled={loading}
          >
            Ajout Fournisseur
          </Button>
        </Modal>
      </Portal>
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
    flex: 1 / 10,
    backgroundColor: "snow",
    padding: 10,
  },

  cmdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  //Fin BlockCmd
  //Block rech
  blockRech: {
    flex: 1.5 / 10,

    marginTop: 1,
    marginBottom: 10,
  },

  //Fin Block rech
  blockArt: {
    flex: 7.5 / 10,
    marginTop: 25,
  },
});
export default FournisseurEspace;
