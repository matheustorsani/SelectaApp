import { Product } from "../types/Products"; // ajusta o caminho pro teu projeto

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
