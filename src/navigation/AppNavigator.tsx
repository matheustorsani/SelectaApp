import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";
import Profile from "../screens/Profile";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: () => <Header />,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Favoritos" component={Favorites} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}
