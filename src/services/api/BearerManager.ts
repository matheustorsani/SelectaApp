let currentBearer: string | null = null;

export const setBearer = (token: string | null) => {
  currentBearer = token;
};

export const getBearer = () => currentBearer;
