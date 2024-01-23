import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Article = ({ article }) => {
  const url = "https://gestpro.globalsystempro.com";
  return (
    <View style={style.main}>
      <Image
        style={{ height: 50, width: 50 }}
        source={{ uri: url + article?.image }}
      />
      <Text style={style.text}>{article.nom}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  main: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "right",
    // justifyContent: "right",
    backgroundColor: "snow",
    height: 70,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    alignSelf: "center",
    verticalAlign: "middle",
  },
});
export default Article;
