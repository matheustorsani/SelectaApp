import { User } from "../types/User";
import React, { useState, useEffect } from "react";
import { saveUser, getUser } from "../services/UserService";

export const UserContext = React.createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}>({
  user: null,
  setUser: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const storedUser = await getUser();
      if (storedUser) setUserState(storedUser);
    })();
  }, []);

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    saveUser(newUser);
  };

  const toggleFavorite = (productId: number) => {
    if (!user) return;

    const favorites = user.favorites ?? [];
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
  };

  const isFavorite = (productId: number) => {
    return user?.favorites?.includes(productId) ?? false;
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleFavorite, isFavorite }}>
      {children}
    </UserContext.Provider>
  );
};
