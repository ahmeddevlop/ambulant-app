import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "../composants/Test";
import VenteAcceuil from "../composants/article/VenteAcceuil";

const VenteStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="VenteAcceuil" component={VenteAcceuil} />
    </Stack.Navigator>
  );
};
export default VenteStack;
