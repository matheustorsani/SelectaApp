import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/User";
import { saveUser, getUser } from "../services/UserService";
import { initBearer, setBearer } from "../services/api/BearerManager";

export const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => Promise<void>;
    logout: () => Promise<void>;
} | null>(null);

/**
 * Provedor de autenticação que envolve a árvore de componentes e fornece
 * o contexto de autenticação (AuthContext).
 *
 * Comportamento:
 * - Na montagem inicial, chama initBearer() e tenta carregar o usuário/bearer salvo via getUser().
 * - Mantém o estado interno `user: User | null`.
 * - Expõe as operações no contexto:
 *   - setUser(newUser: User | null): atualiza o estado, persiste via saveUser() e configura o bearer via setBearer().
 *   - logout(): limpa o usuário, remove a persistência e remove o bearer.
 *
 * Observações:
 * - As operações de persistência e configuração do bearer são assíncronas.
 * - Para consumir este contexto dentro de componentes, utilize o hook useUser().
 *
 * Exemplo de uso:
 * const { user, setUser, logout } = useUser();
 *
 * @component
 * @param {React.ReactNode} children - Elementos filhos que serão envolvidos pelo provedor.
 * @returns {JSX.Element} Provider do AuthContext contendo os filhos.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            await initBearer();
            const savedUser = await getUser();
            if (savedUser) setUserState(savedUser);

        })();
    }, []);

    const setUser = async (newUser: User | null) => {
        setUserState(newUser);
        await saveUser(newUser);
        await setBearer(newUser?.bearer ?? null);
    };

    const logout = async () => {
        setUserState(null);
        await saveUser(null);
        await setBearer(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
