import React, { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RootStackParams, TabParamList } from "../types/Navigation";

// 📱 Screens
import Home from "../screens/Home";
import Search from "../screens/Search";
import Favorites from "../screens/Favorites";
import Cart from "../screens/Cart";
import Profile from "../screens/Profile";
import { ProductDetails } from "../screens/ProductDetails";
import { MyOrders } from "../screens/MyOrders";
import { MyProducts } from "../screens/MyProducts";
import { EditProduct } from "../screens/EditProduct";
import { MySales } from "../screens/MySales";
import { Delivery } from "../screens/Delivery";
import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
import { Categories } from "../screens/Categories";

// 🧩 Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HeaderProductsDetails } from "../components/Headers/HeaderProductsDetails";
import { HeaderEditProduct } from "../components/Headers/HeaderEditProduct";
import { GenericHeader } from "../components/Headers/GenericHeader";
import { MyTickets } from "../screens/MyTickets";
import { Preferences } from "../screens/Preferences";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParams>();

/**
 * @component Tabs
 * 
 * Controla as rotas principais do app via bottom tab.
 * Inclui o Header e Footer personalizados para cada aba.
 * 
 * @returns {JSX.Element} Navegação entre abas (Home, Search, Favorites, Cart, Profile).
 */
function Tabs(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: () => <Header />,
      }}
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

/**
 * @component AppNavigator
 * 
 * Gerencia todas as rotas do app, incluindo stack principal e abas.
 * Cada rota pode ter seu header customizado.
 * 
 * @returns {JSX.Element} Container principal de navegação.
 */
export default function AppNavigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({ route }) => ({
            headerShown: true,
            header: () => (
              <HeaderProductsDetails productId={route.params?.productId} />
            ),
          })}
        />

        <Stack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            headerShown: true,
            header: () => <GenericHeader name="Meus Pedidos" />,
          }}
        />

        <Stack.Screen
          name="MySales"
          component={MySales}
          options={{
            headerShown: true,
            header: () => <GenericHeader name="Minhas Vendas" />,
          }}
        />

        <Stack.Screen
          name="MyProducts"
          component={MyProducts}
          options={{
            headerShown: true,
            header: () => <GenericHeader name="Meus Produtos" />,
          }}
        />

        <Stack.Screen
          name="MyTickets"
          component={MyTickets}
          options={{
            headerShown: true,
            header: () => <GenericHeader name="Meus Tickets" />,
          }}
        />
        
        <Stack.Screen
          name="EditProduct"
          component={EditProduct}
          options={{
            headerShown: true,
            header: () => <HeaderEditProduct />,
          }}
        />

        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{
            headerShown: true,
            header: () => <GenericHeader name="Configurações" />,
          }}
        />

        <Stack.Screen
          name="Delivery"
          component={Delivery}
        />

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
