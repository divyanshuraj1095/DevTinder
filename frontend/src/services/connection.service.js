import api from './api';

export const sendRequest = async (status, toUserId) => {
  const res = await api.post(`/request/send/${status}/${toUserId}`);
  return res.data;
};

export const reviewRequest = async (status, requestId) => {
  const res = await api.post(`/request/review/${status}/${requestId}`);
  return res.data;
};

export const getConnections = async () => {
  const res = await api.get('/user/connections');
  return res.data.data || [];
};

export const getPendingRequests = async () => {
  const res = await api.get('/user/request/received');
  return res.data.data || [];
};
