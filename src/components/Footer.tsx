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
/**
 * Componente de rodapé (Footer) personalizado para navegação por abas.
 *
 * Aqui o ideal é não mexer muito, apenas ajustar estilos se necessário.
 * @param FOOTER_ROUTES Lista de rotas que devem exibir o rodapé.
 * @param icons Mapeamento de nomes de rotas para ícones do FontAwesome.
 * 
 * Exibe ícones e rótulos correspondentes às rotas definidas em `FOOTER_ROUTES`.
 * O botão ativo é destacado visualmente.
 *
 * @param props Propriedades fornecidas automaticamente pelo `BottomTabBarProps`
 * do React Navigation, contendo o estado atual da navegação, descritores e métodos de navegação.
 *
 * @returns Componente de rodapé exibindo os botões de navegação ativos.
 */
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
            <TouchableOpacity key={route.key} style={styles.button} onPress={onPress}>
              <Icon name={iconName} size={18} color={isFocused ? "#0063E6" : "#64748B"} />
              <Text style={[styles.text, isFocused && { color: "#0063E6" }]}>
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
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  button: { alignItems: "center" },
  text: { fontSize: 12, color: "#64748B" },
});
