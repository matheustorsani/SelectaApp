import { responseBody } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Busca imagens principais de um produto.
 * 
 * @param {number} id - ID do produto.
 * @returns {Promise<any>} Dados das imagens principais.
 */
export const mainImages = async (id: number): Promise<any> => {
    try {
        return await responseBody<any>(`${API.routes.mainImages}/${id}`);
    } catch (error) {
        if (error === "404") return console.error("Imagens principais não encontradas para o produto ID:", id);
        console.error("Ocorreu um erro ao buscar as imagens principais:", error);
        return undefined;
    }
};