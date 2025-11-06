import { responseDelete } from "../ApiService";
import { API } from "../../../../config.json";

/**
 * Remove um produto da lista de desejos de um cliente.
 * 
 * @param {number} idClient - ID do cliente.
 * @param {number} idProduct - ID do produto.
 * @returns {Promise<any>} Resposta da API.
 */
export const removeFavorite = async (idClient: number, idProduct: number): Promise<any> => {
    try {
        return responseDelete(API.routes.removeWishList, {
            data: {
                idCliente: idClient,
                idProduto: idProduct,
            },
        });
    } catch (error) {
        console.error("Ocorreu um erro ao remover o produto da lista de desejos:", error);
        throw error;
    }
};