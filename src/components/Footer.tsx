import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const FOOTER_ROUTES = ["Home", "Search", "Favorites", "Cart", "Profile"];

const icons: Record<string, string> = {
  Home: "home",
  Favorites: "heart",
  Cart: "shopping-cart",
  Profile: "user",
  Search: "search",
};

const Footer: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const currentRouteName = state.routes[state.index].name;
  if (!FOOTER_ROUTES.includes(currentRouteName)) return null;

  return (
    <View style={styles.container}>
      {state.routes
        .filter(route => FOOTER_ROUTES.includes(route.name))
        .map(route => {
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
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.button]}
              activeOpacity={0.8}
            >
              <Icon
                name={iconName}
                size={20}
                color={isFocused ? "#0063E6" : "#94A3B8"}
              />
              <Text style={[styles.text, isFocused && styles.focusedText]}>
                {typeof label === "string" ? label : ""}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -1 },
    elevation: 15,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 3,
  },

  text: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },

  focusedText: {
    color: "#0063E6",
    fontWeight: "600",
  },
});
