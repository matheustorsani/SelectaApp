import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca produtos mais vendidos.
 * 
 * @returns {Promise<Product[]>} Lista de produtos mais vendidos.
 */
export const bestSellers = async (): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(API.routes.bestSellers);
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os mais vendidos:", error);
    throw error;
  }
};