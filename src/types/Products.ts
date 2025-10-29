import { ImageSourcePropType } from "react-native";

/**
 * Status de um produto.
 * - `"Ativo"`: produto disponível para venda.
 * - `"Suspenso"`: produto temporariamente indisponível.
 * - `"Inativo"`: produto desativado permanentemente.
 */
type ProductStatus = "Ativo" | "Suspenso" | "Inativo";

/**
 * Condição de um produto.
 * - `true`: produto novo.
 * - `false`: produto usado.
 */
type ProductCondition = true | false;

/**
 * Representa uma especificação de um produto.
 *
 * @property key - Nome da especificação (ex: "Cor", "Tamanho").
 * @property value - Valor da especificação (ex: "Preto", "42").
 *
 * @example
 * ```ts
 * const sizeSpec: Specification = { key: "Tamanho", value: "42" };
 * ```
 */
export interface Specification {
    key: string;
    value: string;
}

/**
 * Representa uma avaliação de um usuário sobre um produto.
 *
 * @property id - Identificador único da avaliação.
 * @property userId - Identificador do usuário que avaliou.
 * @property userName - Nome do usuário que avaliou.
 * @property rating - Nota dada pelo usuário (0 a 5).
 * @property comment - Comentário do usuário sobre o produto.
 * @property date - Data da avaliação no formato ISO ou string legível.
 *
 * @example
 * ```ts
 * const exampleReview: Review = {
 *   id: 1,
 *   userId: 1001,
 *   userName: "João",
 *   rating: 5,
 *   comment: "Produto excelente!",
 *   date: "2025-10-29"
 * };
 * ```
 */
export interface Review {
    id: number;
    userId: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

/**
 * Representa um produto no sistema.
 *
 * @property id - Identificador único do produto.
 * @property idVendedor - Identificador do vendedor responsável.
 * @property name - Nome do produto.
 * @property description - Descrição detalhada do produto (opcional).
 * @property price - Preço atual do produto.
 * @property discount - Valor do desconto aplicado (opcional).
 * @property amount - Quantidade em estoque (opcional).
 * @property image - Imagem do produto, pode ser URL ou referência local (`ImageSourcePropType`).
 * @property category - Categoria à qual o produto pertence.
 * @property peso - Peso do produto em gramas (ou unidade padrão).
 * @property status - Status do produto (`Ativo`, `Suspenso` ou `Inativo`).
 * @property condition - Condição do produto (`true` = Novo, `false` = Usado).
 * @property rate - Avaliação média do produto de 0 a 5 (opcional).
 * @property totalRatings - Número total de avaliações recebidas (opcional).
 * @property specifications - Lista de especificações do produto (opcional), cada item com chave e valor.
 * @property reviews - Lista de avaliações de usuários (opcional).
 *
 * @example
 * ```ts
 * const exampleProduct: Product = {
 *   id: 1,
 *   idVendedor: 101,
 *   name: "Tênis Esportivo",
 *   description: "Tênis confortável para corrida",
 *   price: 199.99,
 *   discount: 20,
 *   amount: 15,
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
 *   ],
 *   reviews: [
 *     {
 *       id: 1,
 *       userId: 1001,
 *       userName: "João",
 *       rating: 5,
 *       comment: "Ótimo produto!",
 *       date: "2025-10-29"
 *     }
 *   ]
 * };
 * ```
 */
export interface Product {
    id: number;
    idVendedor: number;
    name: string;
    description?: string;
    price: number;
    discount?: number;
    amount?: number;
    image: string | ImageSourcePropType;
    category: string;
    peso: number;
    status: ProductStatus;
    condition: ProductCondition;
    rate?: number;
    totalRatings?: number;
    specifications?: Specification[];
    reviews?: Review[];
}
