import { responseDelete } from "../ApiService";
import { API } from "../../../../config.json";

export const deleteProduct = async (productId: number) => {
    try {
        const data = await responseDelete<any>(`${API.routes.deleteProduct}/${productId}`);
        return data;
    } catch (error) {
        console.error("Erro ao deletar produto:", error);
        throw error;
    }
}