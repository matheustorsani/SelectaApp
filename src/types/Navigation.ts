import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ControlsProps } from "./Delivery";
import { CompositeNavigationProp } from "@react-navigation/native";

/**
 * Parâmetros disponíveis nas abas inferiores (Bottom Tabs) do aplicativo.
 * Cada aba não recebe parâmetros (undefined).
 *
 * @example
 * ```ts
 * import { useNavigation } from '@react-navigation/native';
 * import { TabNavigationProp } from './path/to/types';
 *
 * const navigation = useNavigation<TabNavigationProp>();
 * 
 * // Navegar para a aba de Favoritos
 * navigation.navigate('Favorites');
 * ```
 */
export type TabParamList = {
  /** Tela principal do app */
  Home: undefined;
  /** Tela de busca de produtos ou conteúdo */
  Search: undefined;
  /** Tela de favoritos do usuário */
  Favorites: undefined;
  /** Tela do carrinho de compras */
  Cart: undefined;
  /** Tela de perfil do usuário */
  Profile: undefined;
};

/**
 * Parâmetros disponíveis na pilha principal de navegação (Root Stack).
 * Algumas telas podem receber parâmetros, como IDs de produtos.
 *
 * @example
 * ```ts
 * import { useNavigation } from '@react-navigation/native';
 * import { RootStackNavigationProp } from './path/to/types';
 *
 * const navigation = useNavigation<RootStackNavigationProp>();
 * 
 * // Navegar para detalhes de um produto
 * navigation.navigate('ProductDetails', { productId: 123 });
 * ```
 */
export type RootStackParams = {
  /** Tela principal que contém as abas inferiores */
  Tabs: {
    screen?: keyof TabParamList;
    params?: object;
  };
  /** Tela de login */
  Login: undefined;
  /** Tela de registro de novo usuário */
  Register: undefined;
  /** Tela de categorias de produtos */
  Categories: undefined;
  /** Tela de detalhes de um produto específico */
  ProductDetails: { productId: number };
  /** Tela de edição de um produto específico */
  EditProduct: { productId: number };
  /** Tela de pedidos do usuário */
  MyOrders: undefined;
  /** Tela de produtos do usuário */
  MyProducts: undefined;
  /** Tela de entrega */
  Delivery: ControlsProps;
};

/**
 * Tipo de navegação para a pilha principal (Root Stack),
 * utilizado com `useNavigation<RootStackNavigationProp>()`.
 */
export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParams>;

/**
 * Tipo de navegação para as abas inferiores (Bottom Tabs),
 * utilizado com `useNavigation<TabNavigationProp>()`.
 */
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;
