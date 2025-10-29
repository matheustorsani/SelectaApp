import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";

const USER_KEY = "@user";

/**
 * Salva ou remove o usuário no AsyncStorage.
 */
export async function saveUser(user: User | null): Promise<void> {
  try {
    if (!user) {
      await AsyncStorage.removeItem(USER_KEY);
      return;
    }
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.warn("Erro ao salvar usuário:", error);
  }
}

/**
 * Obtém o usuário salvo no AsyncStorage.
 */
export async function getUser(): Promise<User | null> {
  try {
    const data = await AsyncStorage.getItem(USER_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);
    return typeof parsed === "object" && parsed ? (parsed as User) : null;
  } catch (error) {
    console.warn("Erro ao obter usuário:", error);
    return null;
  }
}
