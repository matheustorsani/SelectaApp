import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";
import { mainImages } from "../images/mainImages";

/**
 * Busca um produto específico pelo ID.
 * 
 * @param {number} id - ID do produto.
 * @returns {Promise<Product>} Produto encontrado.
 */
export const getProductById = async (id: number): Promise<Product> => {
    try {
        const data = await responseBody<any>(`${API.routes.getProductById}/${id}`);
        const productData = data;
        const product = normalizeProduct(productData);

        const mainImage = await mainImages(product.id);

        return {
            ...product,
            mainImage: mainImage || undefined
        };
    } catch (error) {
        console.error("Ocorreu um erro ao buscar o produto pelo ID:", error);
        throw error;
    }
};