import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Famille from "./Famille";
import { familleListe } from "../../slices/familleSlice";
import { ScrollView } from "react-native-gesture-handler";
const FamilleListe = ({ navigation }) => {
  const dispatch = useDispatch();
  const famListe = useSelector((state) => state.famille);
  const { familles, loading, erreur } = famListe;
  useEffect(() => {
    dispatch(familleListe());
    if (familles) {
      console.log(familles);
    }
  }, [familles?.length]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {familles && familles.map((f) => <Famille famille={f} />)}
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
        onPress={() => navigation.navigate("FamilleCree")}
      />
    </View>
  );
};

export default FamilleListe;
