import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca todos os produtos disponíveis.
 * 
 * @returns {Promise<Product[]>} Lista de produtos normalizados.
 */
export const allProducts = async (): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(API.routes.allProducts);
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos:", error);
    throw error;
  }
};
