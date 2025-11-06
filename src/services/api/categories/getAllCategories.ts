import { API } from "../../../../config.json";
import { responseBody } from "../ApiService";

/**
 * Obtém todas as categorias disponíveis na API.
 * 
 * @returns {Promise<any[]>} Lista de categorias.
 */
export const getAllCategory = async (): Promise<any[]> => {
  try {
    return await responseBody<any[]>(API.routes.getAllCategory);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar as categorias:", error);
    throw error;
  }
};