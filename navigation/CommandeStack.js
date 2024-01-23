import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "../composants/Test";

const CommandeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="test" component={Test} />
    </Stack.Navigator>
  );
};
export default CommandeStack;
