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
import { clientListe } from "../../slices/clientSlice";
import Client from "./Client";
const ClientEspace = ({ navigation }) => {
  const dispatch = useDispatch();
  const [rech, setRech] = useState("");
  const cliListe = useSelector((state) => state.client);
  const { clients, loading, erreur } = cliListe;

  const [cliRech, setCliRech] = useState([]);

  useEffect(() => {
    setCliRech([]);
    if (rech.length == 0) {
      dispatch(clientListe());
    }
    if (rech.length != 0) {
      clients.map(
        (cli) =>
          cli.nom_cli.toUpperCase().includes(rech.toUpperCase()) &&
          setCliRech((artRech) => [...artRech, cli])
      );
    }
  }, [rech]);

  return (
    <KeyboardAvoidingView style={style.main}>
      <View style={style.blockRech}>
        <Searchbar
          defaultValue={rech}
          onChangeText={(txt) => setRech(txt)}
          placeholder="Recherche Client"
          mode="view"
        />
      </View>
      <View style={style.blockCmd}>
        <TouchableOpacity
          style={{
            backgroundColor: "snow",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("ClientCree")}
        >
          <Text style={style.cmdText}>Créer un Client</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={style.blockArt}>
        {rech.length != 0
          ? cliRech?.map((cli, i) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ClientDetails", { client: cli })
                }
                key={i}
              >
                <Client client={cli} />
              </TouchableOpacity>
            ))
          : clients?.map((cli, i) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ClientDetails", { client: cli })
                }
                key={i}
              >
                <Client client={cli} />
              </TouchableOpacity>
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
export default ClientEspace;
