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
import Login from "../screens/Login";
import Search from "../screens/Search";
import ProductDetails from "../screens/ProductDetails";
import { HeaderProductsDetails } from "../components/HeaderProductsDetails";

export type RootStackParams = {
  Home: undefined,
  Search: undefined,
  Favoritos: undefined,
  Carrinho: undefined,
  Perfil: undefined,
  Register: undefined,
  Login: undefined,
  Categories: undefined,
  ProductDetails: { productId: number }
}

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
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Favoritos" component={Favorites} />
        {/*@ts-ignore*/}
        <Tab.Screen name="Carrinho" component={Cart} />
        <Tab.Screen name="Perfil" component={Profile} />
        <Tab.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Tab.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Tab.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
        <Tab.Screen
          name="ProductDetails"
          //@ts-ignore
          component={ProductDetails}
          options={({ route, navigation }) => ({
            header: () => (
              <HeaderProductsDetails
                navigation={navigation}
                // @ts-ignore
                productId={route.params.productId ?? 0}
              />
            ),
          })}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
