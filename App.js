import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
//Le <Provider>composant rend Redux store disponible à tous les composants imbriqués qui doivent accéder au magasin Redux.
import { Provider } from "react-redux";
import store from "./store";
//c'est pour dir q'on va travaillé avec navigation entre les ecrans
import MainNavigator from "./navigation/MainNavigator";
import { PaperProvider } from "react-native-paper";
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
