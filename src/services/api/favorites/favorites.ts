import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca a lista de desejos de um usuário.
 * 
 * @param {number} id - ID do usuário.
 * @returns {Promise<any>} Lista de produtos favoritos.
 */
export const favorites = async (id: number): Promise<Product[]> => {
    try {
        const data = await responseBody<any>(`${API.routes.wishList}?id=${id}`);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar a lista de desejos:", error);
        throw error;
    }
};