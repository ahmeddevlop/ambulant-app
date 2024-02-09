import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modal, TextInput } from "react-native-paper";
import { ajoutChariot } from "../../slices/chariotSlice";
import { useDispatch, useSelector } from "react-redux";
const Article = ({ article, source, navigation }) => {
  const dispatch = useDispatch();
  const url = "https://gestpro.globalsystempro.com";
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const [qte, setQte] = useState(1);
  const [prix, setPrix] = useState(article.prix_1);
  const [visible, setVisible] = useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const ajoutChariotHandler = () => {
    console.log(qte);
    dispatch(
      ajoutChariot({
        article,
        qte: qte == "" ? 1 : qte,
        prix: prix == "" ? Number(article.prix_1) : prix,
      })
    );
    console.log(chariotListe);
    console.log(url + article?.image);
  };

  return (
    <View style={{ flex: 1, height: "auto", justifyContent: "space-between" }}>
      {source == "consult" ? (
        <TouchableOpacity
          style={style.main}
          onPress={() =>
            navigation.navigate("ArticleMiseAJour", {
              article: article,
            })
          }
        >
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

            {/*Block Quantité */}

            {/* Fin Block quantité */}
          </View>
          <Text style={{ verticalAlign: "middle", flex: 1.5 / 7 }}>
            {Number(article.prix_1).toFixed(3)}DT
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={style.main}>
          <TouchableOpacity
            style={{
              flex: 1 / 5,
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
          <View style={{ flex: 2.5 / 5, justifyContent: "space-between" }}>
            <Text style={style.text}>{article.nom}</Text>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                //alignSelf: "center",
                verticalAlign: "middle",
                flex: 1.5 / 2,
              }}
            >
              {"Prix de départ:" + Number(article.prix_1).toFixed(3)}
            </Text>
            <TextInput
              style={{
                fontSize: 15,
                marginLeft: 5,
                //alignSelf: "center",
                verticalAlign: "middle",
                backgroundColor: "#e6e1e1",
                // flex: 1 / 2,
                height: 5,
                fontSize: 15,
              }}
              keyboardType="numeric"
              label={"Prix:" + (prix == "" ? article.prix_1 : prix)}
              value={prix}
              onChangeText={(txt) => setPrix(txt)}
            />
          </View>
          <View
            style={{
              flex: 1.5 / 5,
              marginLeft: 5,
              justifyContent: "space-between",
            }}
          >
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
            <TextInput
              style={{
                fontSize: 15,
                marginLeft: 5,
                //alignSelf: "center",
                verticalAlign: "middle",
                backgroundColor: "#e6e1e1",
                // flex: 1 / 2,
                height: 5,
                fontSize: 15,
              }}
              label={"Qte:" + (qte == "" ? 1 : qte)}
              value={qte}
              onChangeText={(txt) => setQte(txt)}
              keyboardType="numeric"
            />
            <Text
              style={{
                verticalAlign: "middle",
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {(
                (prix == "" ? Number(article.prix_1) : prix) *
                (qte == "" ? 1 : Number(qte))
              ).toFixed(3)}
              DT
            </Text>
          </View>

          {/*ancien design */}
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
    height: "auto",
    marginBottom: 10,
    padding: 15,
    justifyContent: "space-between",
    borderWidth: 0.5,
    borderColor: "green",
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
    height: "auto",
  },
});
export default Article;
