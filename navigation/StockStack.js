import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StockMenu from "../composants/stock/StockMenu";
import EtatEntree from "../composants/stock/EtatEntree";
import CommandeDetails from "../composants/commande/CommandeDetails";
import EtatSortie from "../composants/stock/EtatSortie";
import StockArticle from "../composants/stock/StockArticle";
import StockMouvement from "../composants/stock/StockMouvement";
const StockStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StcokMenu" component={StockMenu} />
      <Stack.Screen name="EtatEntree" component={EtatEntree} />
      <Stack.Screen name="EtatSortie" component={EtatSortie} />
      <Stack.Screen name="StockArticle" component={StockArticle} />
      <Stack.Screen name="StockMouvement" component={StockMouvement} />

      <Stack.Screen name="CommandeDetails" component={CommandeDetails} />
    </Stack.Navigator>
  );
};
export default StockStack;
