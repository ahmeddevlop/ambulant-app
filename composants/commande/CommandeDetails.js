import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

const CommandeDetails = ({ navigation, route }) => {
  const lien = `https://gestpro.globalsystempro.com`;
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const retourHandler = () => {
    navigation.navigate("Mes Commandes");
  };
  return (
    <View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <View
            style={{ flex: 1 / 3, backgroundColor: "#fafac5", padding: 10 }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, flex: 1 / 2 }}>
                Societe:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "blue",
                  flex: 1 / 2,
                }}
              >
                {route.params.commande?.nom_soc}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, flex: 1 / 2 }}>
                Totale:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "blue",
                  flex: 1 / 2,
                }}
              >
                {route.params.commande?.totalePrix?.toFixed(3)}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 / 1 }}>
            <Text style={styles.titre}>Articles Commandées</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ flex: 1.5 / 3, textAlign: "center" }}>
                Article
              </Text>
              <Text style={{ flex: 0.75 / 3, textAlign: "center" }}>Puv</Text>
              <Text style={{ flex: 0.6 / 3, textAlign: "center" }}>Qte</Text>
            </View>
            <ScrollView>
              {route.params.commande?.chariotListe?.map((item, i) => (
                <View
                  key={i}
                  style={{
                    backgroudColor: "#fff",

                    flexDirection: "row",
                    borderBackgroundColor: "blue",
                    borderBottomWidth: 1,
                    display: "flex",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 2 / 3,
                      display: "flex",
                      flexDirection: "row",
                    }}
                    disabled
                  >
                    <Image
                      source={{ uri: lien + item.image }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 25,
                        marginLeft: 3,
                        flex: 0.75 / 2,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: 0,
                        marginTop: 15,
                        width: 130,
                        color: "rgb(0,120,212)",
                        flex: 1.25 / 2,
                        margin: 4,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {item?.nom}
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{
                      marginTop: 15,

                      flex: 0.75 / 3,
                      margin: 4,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.prix}
                  </Text>

                  <Text
                    style={{
                      flex: 0.5 / 3,
                      margin: 4,
                      marginTop: 15,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    {item?.qty}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ flex: 1 / 2 }}></View>
          <View style={{ flex: 0.4 }}></View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  titre: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "snow",
    backgroundColor: "rgb(37, 150, 190)",
  },
  texte: {
    marginLeft: 10,
    color: "rgb(0,120,212)",
    fontSize: 17,
    textAlign: "center",
  },
});
export default CommandeDetails;
