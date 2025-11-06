import { API } from "../../../../config.json";
import { responsePost } from "../ApiService";

/**
 * Realiza o login de um usuário.
 * 
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<any>} Dados do usuário autenticado.
 */
export const login = async (email: string, password: string): Promise<any> => {
    try {
        const response = await responsePost<any>(API.routes.login, {
            body: {
                email,
                senha: password,
            },
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            const raw = error.response?.data ?? "Erro desconhecido";
            const message = String(raw).trim();
            const capitalizedMessage =
                message.length > 0 ? message.charAt(0).toUpperCase() + message.slice(1) : message;
            throw Error(capitalizedMessage);
        } else if (error.request) {
            throw Error("Sem resposta do servidor");
        } else {
            throw Error("Ocorreu um erro ao realizar o login: " + error.message);
        }
    }
};
