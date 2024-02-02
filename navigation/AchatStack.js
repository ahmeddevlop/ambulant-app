import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "../composants/Test";
import ArticleMenu from "../composants/article/ArticleMenu";
import FamilleListe from "../composants/famille/FamilleListe";
import FamilleCree from "../composants/famille/FamilleCree";
import ArticleListe from "../composants/article/ArticleListe";
import ArticleCree from "../composants/article/ArticleCree";
import AchatMenu from "../composants/achat/AchatMenu";
import FournisseurListe from "../composants/achat/FournisseurListe";
import AchatLance from "../composants/achat/AchatLance";
import { View, TouchableOpacity, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  faBagShopping,
  faDatabase,
  faEllipsisVertical,
  faListDots,
  faListUl,
  faNoteSticky,
  faPencil,
  faPerson,
  faPersonArrowDownToLine,
  faPersonCirclePlus,
  faReceipt,
  faStoreAlt,
  faTractor,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import ChariotMain from "../composants/commande/ChariotMain";
import FournisseurEspace from "../composants/achat/FournisseurEspace";
const AchatStack = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const ch = useSelector((state) => state.chariot);
  const { chariotListe } = ch;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AchatMenu"
        component={AchatMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FournisseurListe"
        component={FournisseurListe}
        options={{ headerTitle: "Liste Fournisseurs" }}
      />
      <Stack.Screen
        name="AchatLance"
        component={AchatLance}
        options={{
          headerTitle: "Lancement d'achat",
          headerStyle: { backgroundColor: "#f57542" },
          headerTintColor: "white",
          headerRight: () => (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  borderWidth: 0.9,
                  borderColor: "white",
                  padding: 5,
                }}
                onPress={() => navigation.navigate("ChariotAchat")}
              >
                <Text style={{ color: "white", verticalAlign: "middle" }}>
                  {chariotListe.reduce((acc, i) => acc + 1, 0)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  alignContent: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("FournisseurEspace")}
              >
                <FontAwesomeIcon
                  size={20}
                  color="snow"
                  icon={faPersonCirclePlus}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesomeIcon
                  size={20}
                  color="snow"
                  icon={faEllipsisVertical}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="ChariotAchat" component={ChariotMain} />
      <Stack.Screen name="FournisseurEspace" component={FournisseurEspace} />
    </Stack.Navigator>
  );
};
export default AchatStack;
