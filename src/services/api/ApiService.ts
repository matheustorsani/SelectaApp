import axios from "axios";
import { API } from "../../../config.json";

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
export const responseBody = async <T = any>(route: string): Promise<T> => {
  const response = await api.get<T>(route);
  return response.data;
};

interface RequestOptions {
  body?: any;
  params?: Record<string, any>;
}
/**
 * Função utilitária para requisições POST genéricas.
 * 
 * @template T Tipo do dado esperado no corpo da resposta.
 * @param {string} route - Caminho relativo da rota na API.
 * @param {RequestOptions} options - Opções adicionais para a requisição, como corpo e parâmetros.
 * @returns {Promise<T>} Dados retornados pela API.
 */
export const responsePost = async <T = any>(route: string, options: RequestOptions = {}): Promise<T> => {
  try {
    const response = await api.post<T>(route, options.body, {
      params: options.params,
    });
    return response.data;
  } catch (error: any) {
    console.error("Erro de post:", error.response?.data || error.message);
    throw error;
  }
};
/**
 * Função utilitária para requisições DELETE genéricas.
 * 
 * @template T Tipo do dado esperado no corpo da resposta.
 * @param {string} route - Caminho relativo da rota na API.
 * @param {any} config - Configurações adicionais para a requisição DELETE.
 * @returns {Promise<T>} Dados retornados pela API.
 */
export const responseDelete = async <T = any>(
  route: string
): Promise<T> => {
  try {
    const response = await api.delete<T>(route);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição DELETE:", error);
    throw error;
  }
};

