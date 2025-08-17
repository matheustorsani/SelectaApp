// src/navigation/AppNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
// import ProductDetails from '../screens/ProductDetails';
// import Login from '../screens/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <><NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />, // Custom Header
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Detalhes' }} />
    <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} /> */}
      </Stack.Navigator>
    </NavigationContainer><Footer /></>
  );
}
