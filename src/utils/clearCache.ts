import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearCache = async (): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem("@Selecta:products_cache");
        return true;
    } catch (error) {
        console.error("Erro ao limpar o cache:", error);
        return false;
    }
}