import AsyncStorage from "@react-native-async-storage/async-storage";

let runtimeBearer: string | null = null;

export const initBearer = async () => {
  const stored = await AsyncStorage.getItem("bearerToken");
  runtimeBearer = stored || null;
  return runtimeBearer;
};

export const setBearer = async (token: string | null) => {
  runtimeBearer = token;

  if (token) {
    await AsyncStorage.setItem("bearerToken", token);
  } else {
    await AsyncStorage.removeItem("bearerToken");
  }
};

export const getBearer = () => runtimeBearer;
