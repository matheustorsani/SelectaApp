import axios from "axios";
import { API } from "../../config.json";
import { normalizeProduct } from "../utils/normalizeProducts";
import { Product } from "../types/Products";

/**
 * Instância principal do Axios configurada com o endpoint base e timeout.
 */
const api = axios.create({
  baseURL: API.endpoint,
  timeout: API.timeout,
});

/**
 * Função utilitária para requisições GET genéricas.
 * 
 * @template T Tipo do dado esperado no corpo da resposta.
 * @param {string} route - Caminho relativo da rota na API.
 * @returns {Promise<T>} Dados retornados pela API.
 */
const responseBody = async <T = any>(route: string): Promise<T> => {
  const response = await api.get<T>(route);
  return response.data;
};

// ============================
// 📦 CATEGORIAS
// ============================

/**
 * Obtém todas as categorias disponíveis na API.
 * 
 * @returns {Promise<any[]>} Lista de categorias.
 */
export const getAllCategory = async (): Promise<any[]> => {
  try {
    return await responseBody<any[]>(API.routes.getAllCategory);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar as categorias:", error);
    throw error;
  }
};

// ============================
// 🛒 PRODUTOS
// ============================

/**
 * Busca todos os produtos disponíveis.
 * 
 * @returns {Promise<Product[]>} Lista de produtos normalizados.
 */
export const allProducts = async (): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(API.routes.allProducts);
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos:", error);
    throw error;
  }
};

/**
 * Busca produtos com base em uma string de pesquisa.
 * 
 * @param {string} query - Termo de busca inserido pelo usuário.
 * @returns {Promise<Product[]>} Produtos que correspondem ao termo.
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(
      `${API.routes.searchProducts}?name=${encodeURIComponent(query.toLowerCase())}`
    );
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos:", error);
    throw error;
  }
};

/**
 * Busca produtos em destaque.
 * 
 * @returns {Promise<Product[]>} Produtos destacados.
 */
export const highlights = async (): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(API.routes.highlightsProducts);
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos em destaque:", error);
    throw error;
  }
};

/**
 * Busca produtos recomendados "para você" com base no ID do usuário.
 * 
 * @param {number} id - ID do usuário.
 * @returns {Promise<Product[]>} Produtos recomendados.
 */
export const forYou = async (id: number): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(`${API.routes.forYouProducts}?id=${id}`);
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os produtos para você:", error);
    throw error;
  }
};

/**
 * Busca produtos mais vendidos.
 * 
 * @returns {Promise<Product[]>} Lista de produtos mais vendidos.
 */
export const bestSellers = async (): Promise<Product[]> => {
  try {
    const data = await responseBody<any[]>(API.routes.bestSellers);
    return data.map(normalizeProduct);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar os mais vendidos:", error);
    throw error;
  }
};

/**
 * Busca um produto específico pelo ID.
 * 
 * @param {number} id - ID do produto.
 * @returns {Promise<Product>} Produto encontrado.
 */
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const data = await responseBody<any>(`${API.routes.getProductById}?id=${id}`);
    return normalizeProduct(data);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar o produto pelo ID:", error);
    throw error;
  }
};

// ============================
// 🔔 NOTIFICAÇÕES E FAVORITOS
// ============================

/**
 * Busca notificações de um usuário.
 * 
 * @param {number} id - ID do usuário.
 * @returns {Promise<any>} Dados das notificações.
 */
export const notifications = async (id: number): Promise<any> => {
  try {
    return await responseBody<any>(`${API.routes.notifications}?id=${id}`);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar as notificações:", error);
    throw error;
  }
};

/**
 * Busca a lista de desejos de um usuário.
 * 
 * @param {number} id - ID do usuário.
 * @returns {Promise<any>} Lista de produtos favoritos.
 */
export const wishList = async (id: number): Promise<any> => {
  try {
    return await responseBody<any>(`${API.routes.wishList}?id=${id}`);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar a lista de desejos:", error);
    throw error;
  }
};

/**
 * Adiciona um produto à lista de desejos de um cliente.
 * 
 * @param {number} idClient - ID do cliente.
 * @param {number} idProduct - ID do produto.
 * @returns {Promise<any>} Resposta da API.
 */
export const addWishList = async (idClient: number, idProduct: number): Promise<any> => {
  try {
    return await responseBody<any>(
      `${API.routes.addWishList}?id=${idProduct}&idCliente=${idClient}`
    );
  } catch (error) {
    console.error("Ocorreu um erro ao adicionar o produto à lista de desejos:", error);
    throw error;
  }
};

// ============================
// 🖼️ IMAGENS
// ============================

/**
 * Busca imagens principais de um produto.
 * 
 * @param {number} id - ID do produto.
 * @returns {Promise<any>} Dados das imagens principais.
 */
export const mainImages = async (id: number): Promise<any> => {
  try {
    return await responseBody<any>(`${API.routes.mainImages}/${id}`);
  } catch (error) {
    console.error("Ocorreu um erro ao buscar as imagens principais:", error);
    throw error;
  }
};

// ============================
// 👤 AUTENTICAÇÃO
// ============================

/**
 * Registra um novo usuário.
 * 
 * @param {string} name - Nome do usuário.
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<any>} Resposta da API.
 */
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post(
      "https://selectaapi-ehg0gcd6cmapggeq.brazilsouth-01.azurewebsites.net/selectaAPI/Client/client-register",
      { nome: name, email, senha: password },
      { headers: { accept: "*/*", "Content-Type": "application/json" } }
    );

    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro ao registrar o usuário:", error);
    throw error;
  }
};

/**
 * Realiza o login de um usuário.
 * 
 * @param {string} email - Email do usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<any>} Dados do usuário autenticado.
 */
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await axios.post(
      "https://selectaapi-ehg0gcd6cmapggeq.brazilsouth-01.azurewebsites.net/selectaAPI/Login/client-login",
      { email, senha: password },
      { headers: { accept: "*/*", "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const raw = error.response?.data ?? "Erro desconhecido";
      const message = String(raw).trim();
      const capitalizedMessage =
        message.length > 0 ? message.charAt(0).toUpperCase() + message.slice(1) : message;
      throw Error(capitalizedMessage);
    } else if (error.request) {
      throw Error("Sem resposta do servidor");
    } else {
      throw Error("Ocorreu um erro ao realizar o login: " + error.message);
    }
  }
};
