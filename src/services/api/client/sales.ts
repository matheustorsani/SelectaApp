import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

export const sales = async (id: number) => {
    try {
        const data = await responseBody<any>(`${API.routes.sales}/${id}`);
        return data;
    } catch {
        return []
    }
}