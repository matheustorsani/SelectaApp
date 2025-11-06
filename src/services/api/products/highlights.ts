import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca produtos em destaque.
 * 
 * @returns {Promise<Product[]>} Produtos destacados.
 */
export const highlights = async (): Promise<Product[]> => {
    try {
        const data = await responseBody<any[]>(API.routes.highlightsProducts);
        return data.map(normalizeProduct);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os produtos em destaque:", error);
        throw error;
    }
};