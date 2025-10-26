import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParams = {
  Tabs: undefined; 
  Login: undefined;
  Register: undefined;
  Categories: undefined;
  ProductDetails: { productId: number };
  EditProduct: { productId: number };
  MyOrders: undefined;
  MyProducts: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParams>;

export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;