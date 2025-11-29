import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

export const getProductsInCart = async () => {
    try {
        return await responseBody<any>(API.routes.getProductsInCart);
    } catch (error) {
        console.error("Ocorreu um erro ao obter os produtos no carrinho:", error);
        throw error && undefined;
    }
};
