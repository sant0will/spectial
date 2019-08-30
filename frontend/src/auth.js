export const isAuthenticated = () => localStorage.getItem('auth-token') !== undefined;
export const getToken = () => localStorage.getItem('auth-token');