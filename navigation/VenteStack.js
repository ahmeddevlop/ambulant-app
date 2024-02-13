import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import VenteAcceuil from "../composants/article/VenteAcceuil";
import ChariotMain from "../composants/commande/ChariotMain";
import ClientCree from "../composants/client/ClientCree";
import ClientEspace from "../composants/client/ClientEspace";
import ClientDetails from "../composants/client/ClientDetails";
import ArticleMiseAJour from "../composants/article/ArticleMiseAJour";
const VenteStack = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VenteAcceuil" component={VenteAcceuil} />
      <Stack.Screen name="ChariotMain" component={ChariotMain} />
      <Stack.Screen name="ClientCree" component={ClientCree} />
      <Stack.Screen name="ClientEspace" component={ClientEspace} />
      <Stack.Screen name="ClientDetails" component={ClientDetails} />
      <Stack.Screen
        name="ArticleMiseAJour"
        component={ArticleMiseAJour}
        options={{ headerTitle: "Mise A Jour Article" }}
      />
    </Stack.Navigator>
  );
};
export default VenteStack;
