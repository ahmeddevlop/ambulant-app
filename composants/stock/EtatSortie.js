import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { commandeListeAction } from "../../slices/commandeSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import Commande from "../commande/Commande";
import Ionicons from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
const EtatSortie = ({ navigation }) => {
  const dispatch = useDispatch();
  const cmdListe = useSelector((state) => state.commande);
  const { commandes, loading, erreur } = cmdListe;
  const [date_d, setDateD] = useState(new Date());
  const [modeD, setModeD] = useState("date");
  const [showD, setShowD] = useState(false);
  const [date_f, setDateF] = useState(new Date());
  const [modeF, setModeF] = useState("date");
  const [showF, setShowF] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(commandeListeAction({ date_d, date_f }));
  }, [date_d, date_f, isFocused]);

  const onChangeDateD = (event, selectedDate) => {
    const currentDate = selectedDate || date_d;
    setShowD(false);
    setDateD(currentDate);
  };

  const showModeD = (currentMode) => {
    setShowD(true);
    setModeD(currentMode);
  };
  const showDatepickerD = () => {
    showModeD("date");
  };
  const onChangeDateF = (event, selectedDate) => {
    const currentDate = selectedDate || date_f;
    setShowF(false);
    setDateF(currentDate);
  };
  const showModeF = (currentMode) => {
    setShowF(true);
    setModeF(currentMode);
  };
  const showDatepickerF = () => {
    showModeF("date");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={style.dateView}>
        <View style={{ flex: 1 / 2, flexDirection: "row", height: "auto" }}>
          <Pressable
            style={{
              flex: 1 / 3,
              backgroundColor: "#4bbf73",
              alignItems: "center",
            }}
            onPress={showDatepickerD}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
            ></Text>
          </Pressable>
          <Text
            style={{
              backgroundColor: "snow",
              flex: 2 / 3,
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
              height: "auto",
            }}
          >
            {`${date_d.getDate()}/${
              date_d.getMonth() + 1
            }/${date_d.getFullYear()}`}
          </Text>
        </View>
        <View style={{ flex: 1 / 2, flexDirection: "row", height: "auto" }}>
          <Pressable
            style={{
              flex: 1 / 3,
              backgroundColor: "#4bbf73",
              alignItems: "center",
            }}
            onPress={showDatepickerF}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
            ></Text>
          </Pressable>
          <Text
            style={{
              backgroundColor: "snow",
              flex: 2 / 3,
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {`${date_f.getDate()}/${
              date_f.getMonth() + 1
            }/${date_f.getFullYear()}`}
          </Text>
        </View>
        {showD && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date_d}
            is24Hour={true}
            display="default"
            onChange={onChangeDateD}
          />
        )}
        {showF && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date_f}
            is24Hour={true}
            display="default"
            onChange={onChangeDateF}
          />
        )}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          // alignItems: "right",
          // justifyContent: "right",
          backgroundColor: "#abc8f7",
          height: "auto",
          marginBottom: 5,
          padding: 5,
          marginTop: 5,
        }}
      >
        <Text style={style.text}>Date Livraison</Text>

        <Text style={style.text}>Client</Text>
        <Text style={style.text}>Totale</Text>
      </View>
      <ScrollView>
        {commandes?.length != 0 &&
          commandes?.map((c, i) => (
            <Commande commande={c} index={i} navigation={navigation} />
          ))}
      </ScrollView>
    </View>
  );
};
const style = StyleSheet.create({
  dateView: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    height: "auto",
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    //alignSelf: "center",
    verticalAlign: "middle",
    //fontWeight: "bold",
    color: "snow",
    flex: 1 / 3,
  },
});
export default EtatSortie;
