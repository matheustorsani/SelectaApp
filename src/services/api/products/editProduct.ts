import { responsePut } from "../ApiService";
import { API } from "../../../../config.json";

interface Props {
    idProduto: number;
    nome?: string;
    descricao?: string;
    preco?: number;
    quantidade?: number;
}

export const editProduct = async ({ idProduto, nome, descricao, preco, quantidade }: Props) => {
    try {
        const data = await responsePut<any>(`${API.routes.editProduct}?idProduto=${idProduto}`, {
            "nome": nome,
            "quantidade": quantidade,
            "precoUnitario": preco,
            "condicao": true,
            "peso": 2,
            "status": "string",
            "nota": 0,
            "descricao": descricao
        })
        return data;
    } catch (error) {
        console.error("Erro ao editar produto:", error);
        throw error;
    }
}