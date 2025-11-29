/**
 * Representa um usuário no sistema.
 *
 * @property id - Identificador único do usuário.
 * @property name - Nome completo do usuário.
 * @property email - E-mail do usuário.
 * @property avatar - URL ou referência da imagem de avatar do usuário.
 * @property phone - Número de telefone do usuário (opcional).
 * @property address - Endereço do usuário (opcional).
 * @property categories - IDs das categorias preferidas do usuário (opcional).
 *
 * @example
 * ```ts
 * const exampleUser: User = {
 *   id: 1,
 *   name: "Matheus Torsani",
 *   email: "matheus@example.com",
 *   avatar: "https://example.com/avatar.jpg",
 *   phone: "+55 11 91234-5678",
 *   address: "Rua Exemplo, 123, São Paulo, SP",
 *   categories: [10, 12]
 * };
 * ```
 */
export interface User {
    bearer?: string;
    id?: number;
    name: string;
    email: string;
    avatar: string;
    phone?: string;
    address?: string;
    categories?: number[];
}
