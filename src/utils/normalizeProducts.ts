import { Product } from "../types/Products";

/**
 * Normaliza um produto retornado pela API para o formato interno do sistema.
 *
 * A API retorna campos com nomes diferentes ou estrutura distinta, e essa
 * função faz o mapeamento para o tipo `Product` utilizado no aplicativo.
 *
 * @param item - Objeto retornado pela API, com campos possivelmente distintos.
 * @returns Um objeto do tipo `Product`, compatível com o restante do sistema.
 *
 * @example
 * ```ts
 * const apiResponse = {
 *   idProduto: 1,
 *   idVendedor: 101,
 *   nome: "Tênis Esportivo",
 *   descricao: "Tênis confortável para corrida",
 *   quantidade: 15,
 *   precoUnitario: 199.99,
 *   discount: 20,
 *   image: "https://example.com/images/tenis.jpg",
 *   category: "Esportes",
 *   peso: 500,
 *   status: "Ativo",
 *   condition: true,
 *   rate: 4.5,
 *   totalRatings: 120,
 *   specifications: [
 *     { key: "Cor", value: "Preto" },
 *     { key: "Tamanho", value: "42" }
 *   ]
 * };
 *
 * const product = normalizeProduct(apiResponse);
 * console.log(product.name); // "Tênis Esportivo"
 * ```
 */
export function normalizeProduct(item: any): Product {
  return {
    id: item.idProduto,
    idVendedor: item.idVendedor,
    name: item.nome,
    description: item.descricao,
    amount: item.quantidade,
    price: item.precoUnitario,
    discount: item.discount,
    image: item.image,
    category: item.category,
    peso: item.peso,
    status: item.status,
    condition: item.condition,
    rate: item.rate,
    totalRatings: item.totalRatings,
    specifications: item.specifications
  };
}
