import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FAB, Modal, Portal, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import {
  fournisseurCree,
  fournisseursListe,
} from "../../slices/fournisseurSlice";
import Fournisseur from "./Fournisseur";
const FournisseurListe = ({ navigation }) => {
  const dispatch = useDispatch();
  const [code_frn, setCodeFrn] = useState("");
  const [nom_frn, setNomFrn] = useState("");
  const [adr_frn, setAdrFrn] = useState("");
  const [visible, setVisible] = React.useState(false);
  const frn = useSelector((state) => state.fournisseur);
  const { loading, erreur, fournisseur, fournisseurs } = frn;
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    alignSelf: "center",
  };
  useEffect(() => {
    dispatch(fournisseursListe());
  }, []);
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
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {fournisseurs &&
          fournisseurs?.map((f) => <Fournisseur fournisseur={f} />)}
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
    </View>
  );
};
const style = StyleSheet.create({
  input: {
    marginBottom: 5,
  },
});
export default FournisseurListe;
