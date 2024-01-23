import {
  faDatabase,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
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

const ArticleMenu = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={style.main}>
      <TouchableOpacity
        style={style.zone}
        onPress={() => navigation.navigate("ArticleListe")}
      >
        <FontAwesomeIcon
          icon={faDatabase}
          size={20}
          style={{ flex: 1 / 4, alignSelf: "center" }}
        />
        <Text style={style.zoneText}>Articles</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.zone}
        onPress={() => navigation.navigate("FamilleListe")}
      >
        <FontAwesomeIcon
          icon={faList}
          size={20}
          style={{ flex: 1 / 4, alignSelf: "center" }}
        />
        <Text style={style.zoneText}>Familles</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
const style = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  zone: {
    display: "flex",
    flexDirection: "row",
    margin: 5,
    backgroundColor: "snow",
    padding: 10,
  },
  zoneText: {
    fontSize: 20,
    flex: 3 / 4,
    width: "100%",
    marginLeft: 7,
  },
});
export default ArticleMenu;
