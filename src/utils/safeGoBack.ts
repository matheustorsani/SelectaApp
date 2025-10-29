import { NavigationProp } from "@react-navigation/native";

/**
 * Navega para a tela anterior de forma segura.
 *
 * Essa função tenta voltar na pilha de navegação verificando:
 * 1. Se o `parent` (navegação pai) pode voltar, retorna para ele.
 * 2. Se a navegação atual pode voltar, retorna para a tela anterior.
 * 3. Se não houver tela para voltar, exibe um aviso no console.
 *
 * @param navigation - Objeto de navegação da tela atual, geralmente obtido via `useNavigation()`.
 *
 * @example
 * ```ts
 * import { useNavigation } from '@react-navigation/native';
 * import { safeGoBack } from './path/to/utils';
 * 
 * const navigation = useNavigation();
 * 
 * // Volta para a tela anterior de forma segura
 * safeGoBack(navigation);
 * ```
 */
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
