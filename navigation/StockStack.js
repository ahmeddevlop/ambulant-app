import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StockMenu from "../composants/stock/StockMenu";
import EtatEntree from "../composants/stock/EtatEntree";
import CommandeDetails from "../composants/commande/CommandeDetails";
import EtatSortie from "../composants/stock/EtatSortie";
import StockArticle from "../composants/stock/StockArticle";
import StockMouvement from "../composants/stock/StockMouvement";
import InventaireListe from "../composants/stock/InventaireListe";
import InventaireAjout from "../composants/stock/InventaireAjout";
import ChariotMain from "../composants/commande/ChariotMain";
import { View, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import InventaireDetails from "../composants/stock/InventaireDetails";
const StockStack = () => {
  const Stack = createNativeStackNavigator();
  const chListe = useSelector((state) => state.chariot);
  const { chariotListe } = chListe;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StcokMenu" component={StockMenu} />
      <Stack.Screen name="EtatEntree" component={EtatEntree} />
      <Stack.Screen name="EtatSortie" component={EtatSortie} />
      <Stack.Screen name="StockArticle" component={StockArticle} />
      <Stack.Screen name="StockMouvement" component={StockMouvement} />
      <Stack.Screen name="InventaireListe" component={InventaireListe} />
      <Stack.Screen name="ChariotMain" component={ChariotMain} />

      <Stack.Screen
        name="InventaireAjout"
        component={InventaireAjout}
        options={{
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
            </View>
          ),
        }}
      />
      <Stack.Screen name="CommandeDetails" component={CommandeDetails} />

      <Stack.Screen name="InventaireDetails" component={InventaireDetails} />
    </Stack.Navigator>
  );
};
export default StockStack;
