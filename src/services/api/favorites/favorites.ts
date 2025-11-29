import { Product } from "../../../types/Products";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";
import { mainImages } from "../images/mainImages";

/**
 * Busca a lista de desejos de um usuário.
 *
 * @returns {Promise<any>} Lista de produtos favoritos.
 */
export const favorites = async (): Promise<Product[]> => {
    try {
        const data = await responseBody<any>(API.routes.wishList);
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
        console.error("Ocorreu um erro ao buscar a lista de desejos:", error);
        throw error;
    }
};