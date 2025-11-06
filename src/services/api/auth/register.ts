import { responsePost } from "../ApiService";
import { API } from "../../../../config.json";
/**
 * Registra um novo usuário.
 * 
 * @param {string} name - Nome do usuário.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<any>} Resposta da API.
 */
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await responsePost<any>(API.routes.register, {
      body: {
        nome: name,
        email,
        senha: password,
      },
    });

    return response;
  } catch (error) {
    console.error("Ocorreu um erro ao registrar o usuário:", error);
    throw error;
  }
};