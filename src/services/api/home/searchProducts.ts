import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca produtos com base em uma string de pesquisa.
 * 
 * @param {string} query - Termo de busca inserido pelo usuário.
 * @returns {Promise<Product[]>} Produtos que correspondem ao termo.
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(
            `${API.routes.searchProducts}?name=${encodeURIComponent(query.toLowerCase())}`
        );
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos:", error);
        throw error;
    }
};