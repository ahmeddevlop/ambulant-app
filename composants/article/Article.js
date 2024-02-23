import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, FAB, Modal, Portal, TextInput } from "react-native-paper";
import { ajoutChariot } from "../../slices/chariotSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const Article = ({ article, source, navigation, maj }) => {
  const dispatch = useDispatch();
  const url = "https://gestpro.globalsystempro.com";
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const [qte, setQte] = useState(1);
  const [prix, setPrix] = useState(article.prix_1);
  const [visible, setVisible] = useState(false);
  const refPrix = React.useRef();
  const qteRef = React.useRef();
  const showModal = () => {
    setVisible(true);
    refPrix?.current?.focus();
  };

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
        maj == false ? (
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

              {/*Block Quantité */}

              {/* Fin Block quantité */}
            </View>
            <Text style={{ verticalAlign: "middle", flex: 1.5 / 7 }}>
              {Number(article.prix_1).toFixed(3)}DT
            </Text>
          </View>
        ) : (
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
        )
      ) : (
        <View
          style={{
            backgroundColor: "snow",
            borderBottomColor: "black",
            borderWidth: 0.8,
          }}
        >
          <Text style={style.text}>{article.nom}</Text>

          <View style={style.main}>
            <View
              style={{
                backgroundColor: "beige",
                //justifyContent: "center",
                borderColor: "black",
                borderWidth: 0.8,
                flex: 1.7 / 4,
              }}
            >
              <TouchableOpacity
                style={{
                  //flex: 1 / 5,
                  width: 100,
                  height: 100,
                  borderRadius: 25,
                  marginLeft: 3,
                  alignSelf: "center",
                  //backgroundColor: "black",
                  //borderColor: "black",
                  // borderWidth: 2,
                }}
                onPress={() =>
                  navigation.navigate("ArticleMiseAJour", {
                    article: article,
                  })
                }
              >
                <Image
                  style={{
                    width: null,
                    borderRadius: 20,
                    flex: 1,
                    //alignSelf: "center",
                    //resizeMode: "contain",
                  }}
                  source={{ uri: url + article?.image }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 3 / 4 }}>
              <View style={{ flex: 1 / 2 }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      flex: 4 / 5,
                      //justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 15,
                            marginLeft: 0.5,
                            //alignSelf: "center",
                            verticalAlign: "middle",
                            padding: 6,
                            color: "#0a19f0",
                            fontFamily: "Montserrat-SemiBold",
                          }}
                        >
                          {/*Stock:{article.num_stock}*/}

                          {"PU:" + Number(article.prix_1).toFixed(3)}
                        </Text>
                        {chariotListe.find((f) => f.article == article._id) && (
                          <Text
                            style={{
                              fontSize: 15,
                              marginLeft: 5,
                              //alignSelf: "center",
                              verticalAlign: "middle",
                              padding: 6,
                              color: "green",
                              fontFamily: "Montserrat-SemiBold",
                            }}
                          >
                            Qte:{qte}
                          </Text>
                        )}
                      </View>

                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <Text
                          style={{
                            verticalAlign: "middle",
                            fontWeight: "bold",
                            marginLeft: 0.4,
                            padding: 6,
                            color: "red",
                            fontFamily: "Montserrat-SemiBold",

                            //alignSelf: "center",
                          }}
                        >
                          Tot:
                          {(
                            (prix == "" ? Number(article.prix_1) : prix) *
                            (qte == "" ? 1 : Number(qte))
                          ).toFixed(3)}
                        </Text>
                        {chariotListe.find((f) => f.article == article._id) && (
                          <Text
                            style={{
                              verticalAlign: "middle",
                              //fontWeight: "bold",
                              marginLeft: 1,
                              padding: 6,
                              color: "green",
                              //fontFamily: "Montserrat-SemiBold",

                              //alignSelf: "center",
                            }}
                          >
                            PUV:
                            {prix}
                          </Text>
                        )}
                      </View>
                    </View>

                    <Portal>
                      <Modal
                        visible={visible}
                        onDismiss={hideModal}
                        style={{ padding: 10 }}
                      >
                        <View style={{ backgroundColor: "snow", padding: 10 }}>
                          <Text style={style.text}>
                            Stock Disponible:{article.num_stock}
                          </Text>
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Text
                              style={{
                                fontSize: 30,
                                verticalAlign: "middle",
                                flex: 1 / 3,
                              }}
                            >
                              {"Prix:"}
                            </Text>
                            <TextInput
                              style={{
                                fontSize: 30,
                                margin: 5,
                                alignSelf: "center",
                                // verticalAlign: "middle",
                                backgroundColor: "#eef7c8",
                                width: "50%",
                                flex: 2 / 3,
                                //height: 12,
                                textAlign: "center",
                              }}
                              ref={refPrix}
                              keyboardType="numeric"
                              value={prix}
                              label={
                                "Prix:" + (prix == "" ? article.prix_1 : prix)
                              }
                              onChangeText={(txt) => setPrix(txt)}
                              onSubmitEditing={() => qteRef.current.focus()}
                            />
                          </View>
                          <View
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <Text style={{ fontSize: 30, flex: 1 / 3 }}>
                              {"Qte:"}
                            </Text>
                            <TextInput
                              style={{
                                fontSize: 30,
                                //margin: 5,
                                // height: 10,
                                alignSelf: "center",
                                verticalAlign: "middle",
                                backgroundColor: "#eef7c8",
                                width: "50%",
                                flex: 2 / 3,
                                //height: 12,
                                textAlign: "center",
                                // flex: 1 / 2,
                              }}
                              value={qte}
                              onChangeText={(txt) => setQte(txt)}
                              keyboardType="numeric"
                              ref={qteRef}
                              label={"Qte:" + (qte == "" ? 1 : qte)}
                            />
                          </View>
                          <Button
                            onPress={() => {
                              ajoutChariotHandler();
                              hideModal();
                            }}
                            style={{ backgroundColor: "orange", margin: 10 }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                verticalAlign: "middle",
                                color: "snow",
                              }}
                            >
                              Ajout
                            </Text>
                          </Button>
                        </View>
                      </Modal>
                    </Portal>
                    {/*ancien design */}
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 / 2 }}>
                <View
                  style={{
                    flex: 1 / 9,
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: chariotListe.find(
                      (ch) => ch.article == article._id
                    )
                      ? "green"
                      : "#F15359",
                    borderRadius: 5,
                    width: "80%",
                    justifyContent: "center",
                    alignSelf: "center",
                    margin: 2,
                  }}
                >
                  <Pressable
                    onPress={() => showModal()}
                    style={{
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}

                    //disabled={false}
                  >
                    <FontAwesomeIcon
                      icon={faBagShopping}
                      size={20}
                      color="snow"
                      style={{ margin: 5 }}
                    />
                    <Text
                      style={{
                        // marginTop: 12,
                        //  marginLeft: 30,
                        color: "snow",
                        fontSize: 15,
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {"Ajout au Panier"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
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
    marginBottom: 3,
    padding: 10,
    //justifyContent: "space-between",
    //borderWidth: 0.5,
    //borderColor: "green",
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
    //alignSelf: "center",
    verticalAlign: "middle",
    fontWeight: "bold",
    color: "green",
    padding: 6,
    fontFamily: "Montserrat-SemiBold",
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
