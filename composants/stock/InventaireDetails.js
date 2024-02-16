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
import {
  inventairesUpdateAction,
  inventairesValiderAction,
} from "../../slices/inventaireSlice";

const InventaireDetails = ({ navigation, route }) => {
  //const lien = `https://gestpro.globalsystempro.com`;
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const validerInventaire = () => {
    route.params.inventaire.chariotListe.map((ch) =>
      dispatch(inventairesValiderAction({ id: ch.article, num_stock: ch.qty }))
    );
    dispatch(
      inventairesUpdateAction({
        id: route.params.inventaire._id,
        etat_inv: "C",
      })
    );

    navigation.navigate("InventaireListe");
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
                Date Inventaire:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "blue",
                  flex: 1 / 2,
                }}
              >
                {route.params.inventaire?.date_inv.substring(0, 10)}
              </Text>
            </View>
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
                {route.params.inventaire?.nom_soc}
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
                {route.params.inventaire?.totalePrix?.toFixed(3)}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, flex: 1 / 2 }}>
                Numéro inventaire:
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "blue",
                  flex: 1 / 2,
                }}
              >
                {route.params.inventaire?.invId}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor:
                  route.params.inventaire.etat_inv == "I" ? "green" : "red",
              }}
              onPress={() => validerInventaire()}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  alignSelf: "center",
                  color: "snow",
                }}
              >
                {route.params.inventaire.etat_inv == "I"
                  ? "Validée"
                  : "Déja Cloturé"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 / 1 }}>
            <Text style={styles.titre}>Articles</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={{ flex: 1.5 / 3, textAlign: "center" }}>
                Article
              </Text>
              <Text style={{ flex: 0.75 / 3, textAlign: "center" }}>Puv</Text>
              <Text style={{ flex: 0.6 / 3, textAlign: "center" }}>Qte</Text>
            </View>
            <ScrollView>
              {route.params.inventaire?.chariotListe?.map((item, i) => (
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
                    <Text
                      style={{
                        marginLeft: 0,
                        marginTop: 15,
                        width: 130,
                        color: "rgb(0,120,212)",
                        flex: 2 / 2,
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
export default InventaireDetails;
