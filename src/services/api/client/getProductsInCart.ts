import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";
import { normalizeProduct } from "../../../utils/normalizeProducts";
import { mainImages } from "../images/mainImages";

export const getProductsInCart = async () => {
    try {
        const data = await responseBody<any>(API.routes.getProductsInCart);
        const productsWithMainImages = await Promise.all(data.map(async (productData) => {
            const product = normalizeProduct(productData);

            const mainImage = await mainImages(product.id);

            return {
                ...product,
                mainImage: mainImage || undefined
            };
        }));

        return productsWithMainImages;
    } catch (error: any) {
        console.error("Ocorreu um erro ao obter os produtos no carrinho:", error);
        if (error.status === 500 || error.status === 404) return [];
        throw error;
    }
};
