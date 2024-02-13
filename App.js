import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
//Le <Provider>composant rend Redux store disponible à tous les composants imbriqués qui doivent accéder au magasin Redux.
import { Provider } from "react-redux";
import store from "./store";
//c'est pour dir q'on va travaillé avec navigation entre les ecrans
import MainNavigator from "./navigation/MainNavigator";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";

const App = () => {
  let customFonts = {
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "KaushanScript-Regular": require("./assets/fonts/KaushanScript-Regular.otf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.otf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.otf"),
  };
  const [isLoaded] = useFonts(customFonts);
  return (
    <Provider store={store}>
      {isLoaded && (
        <PaperProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </PaperProvider>
      )}
    </Provider>
  );
};

export default App;
