import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";
import { mainImages } from "../images/mainImages";

/**
 * Busca todos os produtos disponíveis.
 * 
 * @returns {Promise<Product[]>} Lista de produtos normalizados.
 */
export const allProducts = async (): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(API.routes.allProducts);
    const productsWithMainImages = await Promise.all(data.map(async (productData) => {
      const product = normalizeProduct(productData);

      const mainImage = await mainImages(product.id);

      return {
        ...product,
        mainImage: mainImage || undefined
      };
    }));
    
    return productsWithMainImages;
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos:", error);
    throw error;
  }
};
