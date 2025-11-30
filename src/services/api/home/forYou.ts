import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca produtos recomendados "para você" com base no ID do usuário.
 * 
 * @returns {Promise<Product[]>} Produtos recomendados.
 */
export const forYou = async (): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(`${API.routes.forYouProducts}`);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos para você:", error);
        throw error;
    }
};