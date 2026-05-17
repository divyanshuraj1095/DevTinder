import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/login', { eMail: email, password });
  return res.data;
};

export const signup = async (userData) => {
  const payload = { ...userData, eMail: userData.email };
  delete payload.email;
  const res = await api.post('/signup', payload);
  return res.data;
};

export const logout = async () => {
  await api.post('/logout');
};
