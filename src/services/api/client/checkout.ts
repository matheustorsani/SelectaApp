import { responsePost } from "../ApiService";
import { API } from "../../../../config.json";

type Pagamento = "debito" | "credito" | "pix";

interface Props {
    idProduto: number;
    quantidade: number;
    pagamento: Pagamento;
}

export const checkout = async ({ idProduto, quantidade, pagamento }: Props) => {
    try {
        const data = await responsePost(API.routes.checkout, {
            body: {
                "idProduto": idProduto,
                "quantidade": quantidade,
                "formaPagamento": pagamento,
                "idEnderecoEntrega": 1
            }
        });
        return data;
    } catch (error) {
        console.error("Erro ao finalizar compra:", error);
        throw error;
    }
}

export const checkoutProducts = (pagamento: string) => {
    try {
        const data = responsePost(API.routes.checkoutProducts, {
            body: {
                "idEnderecoEntrega": 1,
                "formaDePagamento": pagamento
            }
        })
        return data;
    } catch (error) {
        console.error("Erro ao finalizar compra dos produtos no carrinho:", error);
        throw error;
    }
}