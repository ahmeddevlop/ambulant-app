import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "../composants/Test";
import ArticleMenu from "../composants/article/ArticleMenu";
import FamilleListe from "../composants/famille/FamilleListe";
import FamilleCree from "../composants/famille/FamilleCree";
import ArticleListe from "../composants/article/ArticleListe";
import ArticleCree from "../composants/article/ArticleCree";

const ArticleStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticleMenu"
        component={ArticleMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FamilleListe"
        component={FamilleListe}
        options={{ headerTitle: "Liste Familles" }}
      />
      <Stack.Screen
        name="FamilleCree"
        component={FamilleCree}
        options={{ headerTitle: "Creer Famille" }}
      />
      <Stack.Screen
        name="ArticleListe"
        component={ArticleListe}
        options={{ headerTitle: "Liste Articles" }}
      />
      <Stack.Screen
        name="ArticleCree"
        component={ArticleCree}
        options={{ headerTitle: "Creer Article" }}
      />
    </Stack.Navigator>
  );
};
export default ArticleStack;
