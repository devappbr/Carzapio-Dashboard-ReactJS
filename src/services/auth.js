export const TOKEN_KEY = "@selfood/data";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};