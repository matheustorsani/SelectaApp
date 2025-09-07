import React from "react";
import { SafeAreaView } from "react-native";
import Home from "./src/screens/Home";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <PaperProvider>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </PaperProvider>
  );
}

