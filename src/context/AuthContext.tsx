import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/User";
import { saveUser, getUser } from "../services/UserService";
import { initBearer, setBearer } from "../services/api/BearerManager";

export const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => Promise<void>;
    logout: () => Promise<void>;
} | null>(null);

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
