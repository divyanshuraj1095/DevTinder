import api from './api';

export const getProfile = async () => {
  const res = await api.get('/profile/view');
  return res.data;
};

export const updateProfile = async (profileData) => {
  const res = await api.patch('/profile/edit', profileData);
  return res.data;
};

export const getFeed = async () => {
  const res = await api.get('/feed');
  return res.data;
};

export const exploreUsers = async (filters = {}) => {
  const res = await api.get('/feed');
  return res.data;
};

export const getProfileById = async (id) => {
  throw new Error("Profile by ID not implemented in backend");
};
