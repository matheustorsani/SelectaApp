import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Register from "../screens/Register";
import Categories from "../screens/Categories";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Categories"
        screenOptions={{
          header: () => <Header />,
        }}
        tabBar={(props: any) => <Footer {...props} />}
      >
        <Tab.Screen name="Register" component={Register} options={{ headerShown: false, tabBarStyle: { display: "none" } }} />
        <Tab.Screen name="Categories" component={Categories} options={{ headerShown: false, tabBarStyle: { display: "none" } }} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favoritos" component={Favorites} />
        <Tab.Screen name="Carrinho" component={Cart} />
        <Tab.Screen name="Perfil" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
