import React from "react";
import { SafeAreaView } from "react-native";
import Home from "./src/screens/Home";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
  );
}

