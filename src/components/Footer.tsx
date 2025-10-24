import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Styles } from "../styles/Styles";

const FOOTER_ROUTES = ["Home", "Favorites", "Cart", "Profile", "Search"];

const icons: Record<string, string> = {
  Home: "home",
  Favorites: "heart",
  Cart: "shopping-cart",
  Profile: "user",
  Search: "search",
};

const Footer: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  if (state.index > 7) return null;
  return (
    <View style={Styles.footerContainer}>
      {state.routes
        .filter(route => FOOTER_ROUTES.includes(route.name))
        .map((route) => {
          const options = descriptors[route.key].options;
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === state.routes.findIndex(r => r.key === route.key);

          const iconName = icons[route.name] || "circle";

          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name as never);
            }
          };

          return (
            <TouchableOpacity key={route.key} style={Styles.button} onPress={onPress}>
              <Icon name={iconName} size={18} color={isFocused ? "#0063E6" : "#64748B"} />
              <Text style={[Styles.buttonText, isFocused && { color: "#0063E6" }]}>
                {typeof label === "function"
                  ? label({
                    focused: isFocused,
                    color: isFocused ? "#FF5252" : "#64748B",
                    position: "below-icon",
                    children: "",
                  })
                  : label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default Footer;
