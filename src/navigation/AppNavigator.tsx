import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParams, TabParamList } from "../types/Navigation";


import Home from "../screens/Home";
import Search from "../screens/Search";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import ProductDetails from "../screens/ProductDetails";
import { MyOrders } from "../screens/MyOrders";
import { MyProducts } from "../screens/MyProducts";
import { EditProduct } from "../screens/EditProduct";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Categories from "../screens/Categories";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { HeaderProductsDetails } from "../components/Headers/HeaderProductsDetails";
import { HeaderMyOrders } from "../components/Headers/HeaderMyOrders";
import { HeaderMyProducts } from "../components/Headers/HeaderMyProducts";
import { HeaderEditProduct } from "../components/Headers/HeaderEditProduct";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParams>();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ header: () => <Header /> }}
      tabBar={(props) => <Footer {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />

        <Stack.Screen
          name="ProductDetails"
          options={({ route, navigation }) => ({
            headerShown: true,
            header: () => <HeaderProductsDetails productId={route.params?.productId} />,
          })}
          component={ProductDetails}
        />

        <Stack.Screen
          name="MyOrders"
          options={{ headerShown: true, header: () => <HeaderMyOrders /> }}
          component={MyOrders}
        />

        <Stack.Screen
          name="MyProducts"
          options={{ headerShown: true, header: () => <HeaderMyProducts /> }}
          component={MyProducts}
        />

        <Stack.Screen
          name="EditProduct"
          options={({ route }) => ({
            headerShown: true,
            header: () => <HeaderEditProduct/>,
          })}
          component={EditProduct}
        />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}