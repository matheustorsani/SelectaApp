import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <FavoritesProvider>
          <CartProvider>
            <PaperProvider>
              <AppNavigator />
            </PaperProvider>
          </CartProvider>
        </FavoritesProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

