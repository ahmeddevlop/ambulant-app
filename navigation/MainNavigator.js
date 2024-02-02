import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNav from "./DrawerNav";
import SocieteInsc from "../composants/societe/SocieteInsc";
import SocieteLogin from "../composants/societe/SocieteLogin";
import Acceuil from "../composants/Acceuil";
const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Acceuil" component={Acceuil} />

      <Stack.Screen name="SocieteLogin" component={SocieteLogin} />

      <Stack.Screen name="SocieteInsc" component={SocieteInsc} />

      <Stack.Screen name="Drawer" component={DrawerNav} />
    </Stack.Navigator>
  );
};
export default MainNavigator;
