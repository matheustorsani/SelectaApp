import { responsePost } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Adiciona um produto à lista de desejos de um cliente.
 * 
 * @param {number} idProduct - ID do produto.
 * @returns {Promise<any>} Resposta da API.
 */
export const addFavorites = async (idProduct: number): Promise<any> => {
    try {
        await responsePost(`${API.routes.addWishList}/${idProduct}`)
    } catch (error) {
        console.error("Ocorreu um erro ao adicionar o produto à lista de desejos:", error);
        throw error;
    }
};
