/**
 * Cria uma versão "debounced" de uma função, ou seja, garante que a função
 * só será executada após um período de inatividade.
 *
 * Isso é útil para evitar chamadas repetidas rápidas, como em eventos de
 * digitação, scroll ou resize.
 *
 * @template T - Tipo da função que será "debounced".
 * @param fn - A função a ser "debounced".
 * @param delay - Tempo de atraso em milissegundos (padrão: 500ms).
 * @returns Uma nova função que, quando chamada, aguardará o tempo de atraso
 * antes de executar a função original.
 *
 * @example
 * ```ts
 * const handleSearch = (query: string) => {
 *   console.log("Buscando:", query);
 * };
 * 
 * const debouncedSearch = debounce(handleSearch, 300);
 * 
 * // Chamadas rápidas consecutivas só dispararão a última após 300ms
 * debouncedSearch("a");
 * debouncedSearch("ab");
 * debouncedSearch("abc");
 * ```
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 500) {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}
