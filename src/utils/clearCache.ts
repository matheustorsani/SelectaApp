import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

export const clearCache = async (): Promise<boolean> => {
    try {
        await AsyncStorage.removeItem("@Selecta:products_cache");
        await Updates.reloadAsync()
        return true;
    } catch (error) {
        console.error("Erro ao limpar o cache:", error);
        return false;
    }
}