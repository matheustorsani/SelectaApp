import { responsePost } from "../ApiService";
import { API } from "../../../../config.json";

export const getUserById = async (id: number): Promise<any> => {
    try {
        return await responsePost<any>(`${API.routes.getUserById}/${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar o usuário pelo ID:", error);
        throw error && undefined;
    }
}