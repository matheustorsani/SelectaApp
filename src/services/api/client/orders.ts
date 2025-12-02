import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

export const orders = async () => {
    try {
        const data = await responseBody<any[]>(API.routes.orders);
        return data;
    } catch (error) {
        console.error("Erro ao buscar histórico de pedidos:", error);
        throw error;
    }
}