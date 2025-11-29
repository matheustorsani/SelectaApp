import { responsePost } from "../ApiService";
import { API } from "../../../../config.json";

export const addToCart = async (productId: number, quantity: number) => {
    try {
        return await responsePost<any>(`${API.routes.addToCart}`, {
            body: {
                idProduto: productId,
                quantidade: quantity
            }
        });
    } catch (error) {
        console.error("Ocorreu um erro ao adicionar o produto ao carrinho:", error);
        throw error && undefined;
    }
}