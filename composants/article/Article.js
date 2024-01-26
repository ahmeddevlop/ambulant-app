import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { ajoutChariot } from "../../slices/chariotSlice";
import { useDispatch, useSelector } from "react-redux";
const Article = ({ article, source }) => {
  const dispatch = useDispatch();
  const url = "https://gestpro.globalsystempro.com";
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const [qte, setQte] = useState(1);
  const ajoutChariotHandler = () => {
    console.log(qte);
    dispatch(ajoutChariot({ article, qte }));
    console.log(chariotListe);
    console.log(url + article?.image);
  };
  return (
    <View>
      {source == "consult" ? (
        <View style={style.main}>
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              flex: 1 / 7,
              alignSelf: "center",
            }}
            source={{ uri: url + article?.image }}
          />
          <View style={style.libStock}>
            <Text style={style.text}>{article.nom}</Text>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                //alignSelf: "center",
                verticalAlign: "middle",
              }}
            >
              Stock:{article.num_stock}
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                //alignSelf: "center",
                verticalAlign: "middle",
              }}
            >
              PU:{Number(article.prix_1).toFixed(3)}
            </Text>
            {/*Block Quantité */}

            {/* Fin Block quantité */}
          </View>
          <Text style={{ verticalAlign: "middle", flex: 1.5 / 7 }}>
            {Number(article.prix_1).toFixed(3)}DT
          </Text>
        </View>
      ) : (
        <View style={style.main}>
          <TouchableOpacity
            style={{
              flex: 7 / 7,
              width: 70,
              height: 70,
              borderRadius: 25,
              marginLeft: 3,
            }}
            onPress={() => ajoutChariotHandler()}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 20,
              }}
              source={{ uri: url + article?.image }}
            />
          </TouchableOpacity>
          <View style={style.libStock}>
            <Text style={style.text}>{article.nom}</Text>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                //alignSelf: "center",
                verticalAlign: "middle",
              }}
            >
              Stock:{article.num_stock}
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                //alignSelf: "center",
                verticalAlign: "middle",
              }}
            >
              PU:{Number(article.prix_1).toFixed(3)}
            </Text>
            {/*Block Quantité */}

            {/* Fin Block quantité */}
          </View>
          <View>
            <TextInput
              label="Qte:"
              defaultValue={qte}
              onChangeText={(txt) => setQte(txt)}
              keyboardType="numeric"
            />
          </View>

          <Text style={{ verticalAlign: "middle", flex: 2 / 7 }}>
            {(Number(article.prix_1) * Number(qte)).toFixed(3)}DT
          </Text>
        </View>
      )}
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
    padding: 5,
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    //alignSelf: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
  },
  libStock: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    flex: 4.5 / 7,
  },
});
export default Article;
