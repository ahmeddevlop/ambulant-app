import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { FAB, ActivityIndicator } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import Famille from "./Famille";
import { familleListe, familleCree } from "../../slices/familleSlice";
import { ScrollView } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import * as SQLite from "expo-sqlite";
import axios from "redaxios";
const FamilleListe = ({ navigation }) => {
  const dispatch = useDispatch();
  const famListe = useSelector((state) => state.famille);
  const { familles, loading, erreur } = famListe;
  const [famLoc, setFamLoc] = useState([]);
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [reseau, setReseau] = useState(false);
  const [famUpdate, setFamUpdate] = useState([]);
  const [synchLoad, setSycnhLoad] = useState(false);
  //const uri = "http://192.168.1.21:5050";
  const uri = "https://gestpro.globalsystempro.com/back_3";
  const createFormData = (fam) => {
    console.log(fam);
    const fileName = fam.image.split("/").pop();
    const fileType = fileName.split(".").pop();

    const formData = new FormData();
    formData.append("file", {
      uri: fam.image,
      name: fam.code_fam + "." + fileType,
      type: `image/${fileType}`,
    });

    return formData;
  };
  const handleUploadPhoto = async (fam) => {
    try {
      const config = { headers: { "Content-type": "multipart/form-data" } };
      let body = createFormData(fam);
      const { data } = await axios.post(`${uri}/api/uploadSftp`, body, config);

      return data;
    } catch (error) {
      alert(error);
    }
  };
  const ajoutFam = async (fam) => {
    let imgServ = await handleUploadPhoto(fam);

    dispatch(
      familleCree({
        code_fam: fam.code_fam,
        lib_fam: fam.lib_fam,
        description: fam.description,
        image: imgServ,
        societe: "65a8e394bd319d1efbd07f7f",
        code_soc: "04",
      })
    );
  };
  const actualiseFamLoc = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM familles where synchro='N'",
        null,
        (txObj, resultSet) => {
          try {
            setSycnhLoad(true);
            resultSet.rows._array.map((fam) => {
              ajoutFam(fam);
              updateLoc(fam.code_fam);
            });
            setSycnhLoad(false);
          } catch (error) {
            alert(error);
          }
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };
  const actualiseSynchro = () => {
    console.log("dans actualize");

    db.transaction((tx) => {
      tx.executeSql(
        "select * from familles where synchro='N'",
        null,
        (txObj, resultSet) => {
          resultSet.rows._array.map((fam) => {
            if (familles.find((f) => f.code_fam == fam.code_fam)) {
              updateLoc(fam.code_fam);
            }
          });
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "select * from familles",
        null,
        (txObj, resultSet) => {
          // console.log(resultSet.rows._array);
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  const updateLoc = (fam) => {
    console.log("fam:" + fam);
    db.transaction((tx) => {
      tx.executeSql(
        `update familles set synchro='O' where code_fam='${fam}'`,
        null,
        (txObj, resultSet) => {
          console.log(`famille de code ${fam.code_fam} est sychronisé!`);
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });
  };

  useEffect(() => {
    testConnexion();
    if (reseau) {
      dispatch(familleListe());

      actualiseFamLoc();
      console.log("fin actualize fam loc");
      actualiseSynchro();
      console.log("fin actualize synchro");
    } else {
      console.log("travail hors ligne");

      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM familles",
          null,
          (txObj, resultSet) => {
            setFamLoc(resultSet.rows._array);
            console.log(resultSet.rows._array);
          },
          (txObj, error) => {
            console.log(error);
          }
        );
      });
      //db.closeAsync();
    }
    //console.log("resultat slice");
  }, [familles?.length, reseau]);
  const testConnexion = () => {
    NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        //Cas en ligne

        setReseau(true);
      } else {
        //Cas hors-ligne
        setReseau(false);
      }
    });
  };
  return (
    <View style={{ flex: 1 }}>
      {loading || synchLoad ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <ScrollView>
          {reseau
            ? familles.map((f, i) => (
                <Famille
                  famille={f}
                  index={i}
                  reseau={true}
                  navigation={navigation}
                />
              ))
            : famLoc.map((f, i) => (
                <Famille famille={f} index={i} reseau={false} />
              ))}
        </ScrollView>
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
        onPress={() => navigation.navigate("FamilleCree")}
      />
    </View>
  );
};

export default FamilleListe;
