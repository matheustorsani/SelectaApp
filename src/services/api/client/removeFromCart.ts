import { responseDelete } from "../ApiService";
import { API } from "../../../../config.json";


export const removeFromCart = async (productId: string | number) => {
    try {
        return await responseDelete<any>(`${API.routes.removeFromCart}${productId}`)
    } catch (error) {
        console.error("Ocorreu um erro ao remover o produto do carrinho:", error);
        throw error && undefined;
    }
}