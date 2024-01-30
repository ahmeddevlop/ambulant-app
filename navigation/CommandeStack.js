import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommandeListe from "../composants/commande/CommandeListe";
import CommandeDetails from "../composants/commande/CommandeDetails";
const CommandeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommandeListe" component={CommandeListe} />
      <Stack.Screen name="CommandeDetails" component={CommandeDetails} />
    </Stack.Navigator>
  );
};
export default CommandeStack;
