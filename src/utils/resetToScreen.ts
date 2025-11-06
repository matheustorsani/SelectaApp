import { RootStackNavigationProp } from "../types/Navigation";

/** 
 * Navega para a tela inicial do aplicativo, resetando a pilha de navegação.
 * Criando isso aqui para usar no register, login e logout.
 */
export const resetToHome = (navigation: RootStackNavigationProp) => {
    navigation.reset({
        index: 0,
        routes: [{ name: "Tabs", params: { screen: "Home" } }],
    })
}

export const resetToCategories = (navigation: RootStackNavigationProp) => {
    navigation.reset({
        index: 0,
        routes: [{ name: "Categories" }],
    })
}