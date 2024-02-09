import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { articlesListe } from "../../slices/articleSlice";
import { useIsFocused } from "@react-navigation/native";
import Article from "./Article";
const ArticleListe = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const artListe = useSelector((state) => state.article);
  const { articles, loading, erreur } = artListe;
  useEffect(() => {
    dispatch(articlesListe());
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {articles &&
          articles?.articles?.map((a) => (
            <Article article={a} source="consult" navigation={navigation} />
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
        onPress={() => navigation.navigate("ArticleCree")}
      />
    </View>
  );
};

export default ArticleListe;
