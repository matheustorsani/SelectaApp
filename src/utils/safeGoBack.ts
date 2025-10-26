import { NavigationProp } from "@react-navigation/native";

export function safeGoBack(navigation: NavigationProp<any>) {
  const parent = navigation.getParent();

  if (parent?.canGoBack()) {
    parent.goBack();
  } else if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    console.warn("Não há tela para voltar.");
  }
}