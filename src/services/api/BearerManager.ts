import AsyncStorage from "@react-native-async-storage/async-storage";

let currentBearer: string | null = null;

export const initBearer = async () => {
  const stored = await AsyncStorage.getItem("bearerToken");
  currentBearer = stored || null;
  return currentBearer;
};

export const setBearer = async (token: string | null) => {
  currentBearer = token;

  if (token) {
    await AsyncStorage.setItem("bearerToken", token);
  } else {
    await AsyncStorage.removeItem("bearerToken");
  }
};

export const getBearer = () => currentBearer;
