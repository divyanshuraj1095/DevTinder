import api from './api';

export const getProfile = async () => {
  const res = await api.get('/profile/view');
  return res.data;
};

export const updateProfile = async (profileData) => {
  const res = await api.patch('/profile/edit', profileData);
  return res.data;
};

export const getFeed = async (page = 1, limit = 10) => {
  const res = await api.get('/feed', { params: { page, limit } });
  return res.data;
};
