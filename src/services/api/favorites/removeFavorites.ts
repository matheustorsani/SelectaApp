import { responseDelete } from "../ApiService";
import { API } from "../../../../config.json";
import axios from "axios";

/**
 * Remove um produto da lista de desejos de um cliente.
 * 
 * @param {number} idProduct - ID do produto.
 * @returns {Promise<any>} Resposta da API.
 */
export const removeFavorite = async (idProduct: number): Promise<any> => {
    try {
        await responseDelete(`${API.routes.removeWishList}/${idProduct}`);
    } catch (error) {
        console.error("Ocorreu um erro ao remover o produto da lista de desejos:", error);
        throw error;
    }
};