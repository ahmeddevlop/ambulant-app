import "react-native-gesture-handler";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import VenteStack from "./VenteStack";
import CommandeStack from "./CommandeStack";
import ArticleStack from "./ArticleStack";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBagShopping,
  faDatabase,
  faEllipsisVertical,
  faListDots,
  faListUl,
  faNoteSticky,
  faPerson,
  faPersonArrowDownToLine,
  faPersonCirclePlus,
  faReceipt,
  faTractor,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const DrawerNav = ({ navigation }) => {
  let Drawer = createDrawerNavigator();
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{
            backgroundColor: "green",
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
              color: "snow",
            }}
          >
            Bonjour mr Bienvenue Dans Application ambulant
          </Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="VenteStack"
        component={VenteStack}
        options={{
          drawerIcon: () => <FontAwesomeIcon size={20} icon={faBagShopping} />,
          drawerLabel: "Ventes",
          //drawerLabelStyle: { color: "snow" },
          headerTitle: "Vente",
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
                onPress={() => navigation.navigate("ChariotMain")}
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
      <Drawer.Screen
        name="CommandeStack"
        component={CommandeStack}
        options={{
          drawerIcon: () => <FontAwesomeIcon size={20} icon={faReceipt} />,
          drawerLabel: "Recu",
          //drawerLabelStyle: { color: "snow" },
          headerTitle: "Recu",
          headerStyle: { backgroundColor: "#f57542" },
          headerTintColor: "white",
          headerRight: () => (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity style={{ marginRight: 20 }}>
                <FontAwesomeIcon
                  size={20}
                  color="snow"
                  icon={faPersonCirclePlus}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 20 }}>
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
      <Drawer.Screen
        name="ArticleStack"
        component={ArticleStack}
        options={{
          drawerIcon: () => <FontAwesomeIcon size={20} icon={faDatabase} />,
          drawerLabel: "Articles",
          //drawerLabelStyle: { color: "snow" },
          headerTitle: "Article",
          headerStyle: { backgroundColor: "#f57542" },
          headerTintColor: "white",
          headerRight: () => (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity style={{ marginRight: 20 }}>
                <FontAwesomeIcon
                  size={20}
                  color="snow"
                  icon={faPersonCirclePlus}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 20 }}>
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
    </Drawer.Navigator>
  );
};
export default DrawerNav;
