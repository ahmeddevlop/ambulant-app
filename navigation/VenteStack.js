import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VenteAcceuil from "../composants/article/VenteAcceuil";
import ChariotMain from "../composants/commande/ChariotMain";

const VenteStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VenteAcceuil" component={VenteAcceuil} />
      <Stack.Screen name="ChariotMain" component={ChariotMain} />
    </Stack.Navigator>
  );
};
export default VenteStack;
