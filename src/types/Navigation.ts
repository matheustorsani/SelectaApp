import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ControlsProps } from "./Delivery";
import { Product } from "./Products";

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
  /** Tela de Minhas Vendas */
  MySales: undefined;
  /** Tela de Meus Tickets */
  MyTickets: undefined;
  /** Tela de configurações */
  Preferences: undefined;
  /** Tela de Dados Cadastrais */
  MyData: undefined;
  /** Tela de Adicionar novo produto */
  AddProduct: undefined;
};


export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParams>;

export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;


/**
 * Propriedades de tela tipadas para o stack raiz de navegação.
 *
 * Tipo utilitário que mapeia as props fornecidas pelo NativeStackNavigator para uma
 * rota específica definida em RootStackParams. Garante tipagem segura dos objetos
 * `navigation` e `route` conforme a chave da rota selecionada.
 *
 * @typeParam T - Chave de rota presente em RootStackParams (por exemplo: "EditProduct" | "ProductDetails").
 *
 * @see RootStackParams
 * 
 * @example
 * // function MyScreen({ navigation, route }: RootStackScreenProps<'ProductDetails'>) { ... }
 */
export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<RootStackParams, T>;