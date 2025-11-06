import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca notificações de um usuário.
 * 
 * @param {number} id - ID do usuário.
 * @returns {Promise<any>} Dados das notificações.
 */
export const notifications = async (id: number): Promise<any> => {
    try {
        return await responseBody<any>(`${API.routes.notifications}?id=${id}`);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar as notificações:", error);
        throw error;
    }
};
