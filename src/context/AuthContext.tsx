import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/User";
import { saveUser, getUser } from "../services/UserService";

export const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void
} | null>(null);

/**
 * Componente AuthProvider que fornece estado de autenticação e atualizador para seus descendentes.
 *
 * Este provider mantém um estado `user` (tipo `User | null`) e o expõe junto com a função
 * `setUser` via `AuthContext`. Ao montar, tenta restaurar um usuário previamente salvo
 * chamando a função assíncrona `getUser`; se um usuário salvo for encontrado, o componente
 * inicializa seu estado com esse valor. A função `setUser` atualiza o estado em memória e
 * persiste a alteração chamando a função assíncrona `saveUser`.
 *
 * @param props.children - Os filhos React a serem envoltos pelo provider.
 * @returns Um elemento React que renderiza `AuthContext.Provider` com o valor `{ user, setUser }`.
 *
 * @remarks
 * - O efeito de restauração é executado uma vez na montagem.
 * - `getUser` e `saveUser` são helpers assíncronos externos responsáveis pela persistência.
 * - Chamar `setUser` realiza uma atualização síncrona do estado e dispara um efeito colateral
 *   assíncrono de persistência.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            const savedUser = await getUser();
            if (savedUser) setUserState(savedUser);
        })();
    }, []);

    const setUser = (newUser: User | null) => {
        setUserState(newUser);
        saveUser(newUser);
    };

    const logout = () => {
        setUser(null);
        
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>{children}</AuthContext.Provider>
    );
};
