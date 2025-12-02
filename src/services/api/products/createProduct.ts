import { responsePost } from "../ApiService";
import { API } from "../../../../config.json";

interface Props {
    idVendedor: number;
    nome: string;
    quantidade: number;
    preco: number;
    descricao: string;
}

export const createProduct = async ({ idVendedor, nome, quantidade, preco, descricao }: Props) => {
    try {
        const data = await responsePost(API.routes.createProduct, {
            body: {
                "idVendedor": idVendedor,
                "nome": nome,
                "quantidade": quantidade,
                "precoUnitario": preco,
                "descricao": descricao,
                "peso": 0,
                "status": "ativo",
                "condicao": true
            }
        });
        return data;
    } catch (error) {
        console.error("Erro ao criar produto:", error);
        throw error;
    }
}