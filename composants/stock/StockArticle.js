import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FAB, ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { articlesListe } from "../../slices/articleSlice";
import { useIsFocused } from "@react-navigation/native";
import Article from "../article/Article";
import { FlashList } from "@shopify/flash-list";
const StockArticle = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const artListe = useSelector((state) => state.article);
  const { articles, loading, erreur } = artListe;
  const renderItem = (a) => {
    return (
      <View>
        <Article article={a.item} source="consult" navigation={navigation} />
      </View>
    );
  };
  const getItemLayout = (data, index) => ({
    length: 394.6666564941406,
    offset: 394.6666564941406 * index,
    index,
  });
  const keyExtractor = (item) => item._id;
  useEffect(() => {
    dispatch(articlesListe());
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size={"large"} style={{ marginTop: 10 }} />
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

export default StockArticle;
