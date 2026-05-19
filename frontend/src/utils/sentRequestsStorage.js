const STORAGE_KEY = 'devtinder_sent_requests';

export function getSentRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addSentRequest({ _id, firstName, lastName }) {
  const list = getSentRequests();
  if (list.some((r) => r._id === _id)) return list;
  const next = [
    { _id, firstName, lastName, sentAt: new Date().toISOString() },
    ...list,
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function removeSentRequest(userId) {
  const next = getSentRequests().filter((r) => r._id !== userId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function pruneSentRequests(connectedUserIds) {
  const ids = new Set(connectedUserIds.map(String));
  const next = getSentRequests().filter((r) => !ids.has(String(r._id)));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
