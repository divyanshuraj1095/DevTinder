import api from './api';

export const sendMessage = async (toUserId, text) => {
  const res = await api.post('/message', { toUser: toUserId, text });
  return res.data;
};

export const getMessages = async (userId) => {
  const res = await api.get(`/messages/${userId}`);
  const data = res.data;
  if (!Array.isArray(data)) {
    const err = new Error(data?.message || 'Failed to load messages');
    err.parsedMessage = err.message;
    throw err;
  }
  return data;
};
