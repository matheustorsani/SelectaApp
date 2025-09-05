import React from "react";
import { View, Text, TouchableOpacity, Stylesheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Styles } from "../styles/Styles";


const Footer = () => {
  const navigation = useNavigation();

  const buttons = [
    { name: "Inicio", icon: "home", screen: "Home" },
    { name: "Favoritos", icon: "heart", screen: "Favorites" },
    //   { name: 'Buscar', icon: 'search', screen: 'Search' },
    //   { name: 'Carrinho', icon: 'shopping-cart', screen: 'Cart' },
    { name: 'Perfil', icon: 'user', screen: 'Profile' }
  ];

  return (
    <View style={Styles.footerContainer}>
      {buttons.map((btn) => (
        <TouchableOpacity
          key={btn.name}
          style={Styles.button}
          onPress={() => navigation.navigate(btn.screen as never)}
        >
          <Icon name={btn.icon} size={18} color="#64748B" />
          <Text style={Styles.buttonText}>{btn.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;


