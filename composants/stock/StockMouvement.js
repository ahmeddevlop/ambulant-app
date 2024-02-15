import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  Portal,
  Searchbar,
  ActivityIndicator,
  Modal,
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { articlesListe } from "../../slices/articleSlice";
import Article from "../article/Article";
import { commandeListeAction, creerCommande } from "../../slices/commandeSlice";
import chariotSlice, { revertChariot } from "../../slices/chariotSlice";
import { useIsFocused } from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { useFonts } from "expo-font";
import { FlashList } from "@shopify/flash-list";
import DateTimePicker from "@react-native-community/datetimepicker";
import { achatListeAction } from "../../slices/achatSlice";
const StockMouvement = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [rech, setRech] = useState("");
  const artListe = useSelector((state) => state.article);
  const { articles, loading, erreur } = artListe;
  const [artRech, setArtRech] = useState([]);
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  const [load, setLoad] = useState(false);
  const lien = "https://gestpro.globalsystempro.com";
  const cmdListe = useSelector((state) => state.commande);
  const { commandes } = cmdListe;
  const achListe = useSelector((state) => state.achat);
  const { achats } = achListe;
  const [date_d, setDateD] = useState(new Date());
  const [modeD, setModeD] = useState("date");
  const [showD, setShowD] = useState(false);
  const [date_f, setDateF] = useState(new Date());
  const [modeF, setModeF] = useState("date");
  const [showF, setShowF] = useState(false);
  const [visible, setVisible] = useState(false);
  const [artChoisi, setArtChoisi] = useState({});
  const showModal = (art) => {
    console.log(art);
    setArtChoisi(art);
    dispatch(achatListeAction({ date_d, date_f }));

    dispatch(commandeListeAction({ date_d, date_f }));

    console.log(qte_achat(art));
    console.log(qte_sortie(art));
    setVisible(true);
  };
  const qte_achat = (art) => {
    let res = [];
    achats.map((a) =>
      a.chariotListe.map((ch) => ch.nom === art.nom && res.push(ch))
    );
    let resultat = res.reduce((acc, i) => acc + i.qty, 0);
    return resultat;
  };
  const qte_sortie = (art) => {
    let res = [];
    commandes.map((a) =>
      a.chariotListe.map((ch) => ch.nom === art.nom && res.push(ch))
    );
    let resultat = res.reduce((acc, i) => acc + i.qty, 0);
    return resultat;
  };

  const hideModal = () => setVisible(false);
  const onChangeDateD = (event, selectedDate) => {
    const currentDate = selectedDate || date_d;
    setShowD(false);
    setDateD(currentDate);
  };
  const showModeD = (currentMode) => {
    setShowD(true);
    setModeD(currentMode);
  };
  const showDatepickerD = () => {
    showModeD("date");
  };
  const onChangeDateF = (event, selectedDate) => {
    const currentDate = selectedDate || date_f;
    setShowF(false);
    setDateF(currentDate);
  };
  const showModeF = (currentMode) => {
    setShowF(true);
    setModeF(currentMode);
  };
  const showDatepickerF = () => {
    showModeF("date");
  };
  useEffect(() => {
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
  }, [rech, isFocused]);

  const renderItem = (a) => {
    return (
      <TouchableOpacity onPress={() => showModal(a.item)}>
        <Article
          article={a.item}
          source="consult"
          navigation={navigation}
          maj={false}
        />
      </TouchableOpacity>
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
      <View style={style.blockRech}>
        <Searchbar
          defaultValue={rech}
          onChangeText={(txt) => setRech(txt)}
          placeholder="Recherche article"
          mode="view"
        />
      </View>
      <View style={style.dateView}>
        <View style={{ flex: 1 / 2, flexDirection: "row", height: "auto" }}>
          <Pressable
            style={{
              flex: 1 / 3,
              backgroundColor: "#4bbf73",
              alignItems: "center",
            }}
            onPress={showDatepickerD}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
            ></Text>
          </Pressable>
          <Text
            style={{
              backgroundColor: "snow",
              flex: 2 / 3,
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
              height: "auto",
            }}
          >
            {`${date_d.getDate()}/${
              date_d.getMonth() + 1
            }/${date_d.getFullYear()}`}
          </Text>
        </View>
        <View style={{ flex: 1 / 2, flexDirection: "row", height: "auto" }}>
          <Pressable
            style={{
              flex: 1 / 3,
              backgroundColor: "#4bbf73",
              alignItems: "center",
            }}
            onPress={showDatepickerF}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
            ></Text>
          </Pressable>
          <Text
            style={{
              backgroundColor: "snow",
              flex: 2 / 3,
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {`${date_f.getDate()}/${
              date_f.getMonth() + 1
            }/${date_f.getFullYear()}`}
          </Text>
        </View>
        {showD && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date_d}
            is24Hour={true}
            display="default"
            onChange={onChangeDateD}
          />
        )}
        {showF && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date_f}
            is24Hour={true}
            display="default"
            onChange={onChangeDateF}
          />
        )}
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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={{ padding: 10, width: "100%" }}
        >
          <View style={{ backgroundColor: "snow", padding: 10 }}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                fontWeight: "bold",
                color: "green",
              }}
            >
              Periode entre:
              {`${date_d.getDate()}/${
                date_d.getMonth() + 1
              }/${date_d.getFullYear()}`}{" "}
              et{" "}
              {`${date_f.getDate()}/${
                date_f.getMonth() + 1
              }/${date_f.getFullYear()}`}
            </Text>

            <ScrollView
              contentContainerStyle={{
                padding: 5,
                justifyContent: "center",
                borderWidth: 0.5,
                borderColor: "black",
              }}
              horizontal={true}
            >
              <View style={{ padding: 3 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  Article
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  {artChoisi.nom}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  Qte Départ
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  {artChoisi.num_stock}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  Qte Entrée
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  {qte_achat(artChoisi)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  Qte Sortie
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  {qte_sortie(artChoisi)}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  Reste
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    alignSelf: "center",
                    margin: 5,
                  }}
                >
                  {artChoisi.num_stock +
                    qte_achat(artChoisi) -
                    qte_sortie(artChoisi)}
                </Text>
              </View>
            </ScrollView>
          </View>
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
    flex: 9 / 10,
    marginTop: 25,
  },
  dateView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    height: "auto",
  },
});
export default StockMouvement;
