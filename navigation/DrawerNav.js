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
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBagShopping,
  faCartShopping,
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
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/societeSlice";
import AchatStack from "./AchatStack";
import StockStack from "./StockStack";
const DrawerNav = ({ navigation }) => {
  const dispatch = useDispatch();
  let Drawer = createDrawerNavigator();
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  const socAct = useSelector((state) => state.societe);
  const { societeActuelle } = socAct;
  const url = "https://gestpro.globalsystempro.com";
  const deconnexion = () => {
    dispatch(logout());
    navigation.navigate("SocieteLogin");
  };
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{
            backgroundColor: "#f57542",
            height: 200,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: url + societeActuelle.logo_soc }}
            style={{
              width: "50%",
              height: "50%",
              resizeMode: "contain",
              margin: 5,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              textAlign: "center",
              color: "snow",
            }}
          >
            Société:{societeActuelle.nom_soc}
          </Text>
        </View>
        {societeActuelle && (
          <TouchableOpacity
            onPress={() => deconnexion()}
            style={{ padding: 10, backgroundColor: "red" }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "snow",
                alignSelf: "center",
                verticalAlign: "middle",
              }}
            >
              Deconnexion
            </Text>
          </TouchableOpacity>
        )}

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
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 15,
                }}
                onPress={() => navigation.navigate("ChariotMain")}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  size={20}
                  color="white"
                />
                {chariotListe && chariotListe.length > 0 && (
                  <Text
                    style={{
                      backgroundColor: "snow",
                      height: 18,
                      fontSize: 8,
                      color: "black",
                      width: 18,
                      borderRadius: 50,
                      textAlign: "center",
                      style: 0.25 / 2,
                      verticalAlign: "top",
                      fontWeight: "bold",
                    }}
                  >
                    {chariotListe &&
                      chariotListe.length > 0 &&
                      chariotListe.length}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginRight: 20,
                  alignContent: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("ClientEspace")}
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
          /*headerRight: () => (
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
          )*/
        }}
      />
      <Drawer.Screen
        name="ArticleStack"
        component={ArticleStack}
        options={{
          drawerIcon: () => <FontAwesomeIcon size={20} icon={faListUl} />,
          drawerLabel: "Articles",
          //drawerLabelStyle: { color: "snow" },
          headerTitle: "Article",
          headerStyle: { backgroundColor: "#f57542" },
          headerTintColor: "white",
          /*headerRight: () => (
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
          )*/
        }}
      />
      <Drawer.Screen
        name="AchatStack"
        component={AchatStack}
        options={{
          drawerIcon: () => <FontAwesomeIcon size={20} icon={faTruck} />,
          drawerLabel: "Achats",
          //drawerLabelStyle: { color: "snow" },
          headerTitle: "Achats",
          headerStyle: { backgroundColor: "#f57542" },
          headerTintColor: "white",
        }}
      />
      <Drawer.Screen
        name="StockStack"
        component={StockStack}
        options={{
          drawerIcon: () => <FontAwesomeIcon size={20} icon={faWarehouse} />,
          drawerLabel: "Stock",
          //drawerLabelStyle: { color: "snow" },
          headerTitle: "Stock",
          headerStyle: { backgroundColor: "#f57542" },
          headerTintColor: "white",
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNav;
