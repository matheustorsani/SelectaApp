import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Footer = () => {
  const buttons = [
    { name: 'Inicio', icon: 'home' },
    { name: 'Buscar', icon: 'search' },
    { name: 'Favoritos', icon: 'heart' },
    { name: 'Carrinho', icon: 'shopping-cart' },
    { name: 'Perfil', icon: 'user' }
  ];

  return (
    <View style={styles.footerContainer}>
      {buttons.map((btn) => (
        <TouchableOpacity key={btn.name} style={styles.button}>
          <Icon name={btn.icon} size={18} color="#64748B" />

          <Text style={styles.buttonText}>{btn.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingBottom: 10,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#64748B',
  },
});

export default Footer;
