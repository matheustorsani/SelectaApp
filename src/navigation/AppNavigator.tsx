import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />,
        }}
        tabBar={(props: any) => <Footer {...props} />}
      >
        <Tab.Screen name="Home" component={Home} />
        {/* <Tab.Screen name="Favoritos" component={Favorites} />
        <Tab.Screen name="Carrinho" component={Cart} />
        <Tab.Screen name="Perfil" component={Profile} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
