import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Styles } from "../styles/Styles";

const Footer: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={Styles.footerContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const iconName =
          route.name === "Home"
            ? "home"
            : route.name === "Favoritos"
              ? "heart"
              : route.name === "Carrinho"
                ? "shopping-cart"
                : "user";

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name as never);
          }
        };

        return (
          <TouchableOpacity key={route.key} style={Styles.button} onPress={onPress}>
            <Icon name={iconName} size={18} color={isFocused ? "#0063E6" : "#64748B"} />
            <Text style={[Styles.buttonText, isFocused && { color: "#0063E6" }]}>
              {typeof label === "function" ? label({ focused: isFocused, color: isFocused ? "#FF5252" : "#64748B", position: "below-icon", children: "" }) : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


export default Footer;
