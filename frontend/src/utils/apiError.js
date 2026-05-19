export function parseApiError(error) {
  const data = error?.response?.data;
  if (typeof data === 'string') {
    return data.replace(/^ERROR:\s*/i, '').replace(/^Error:\s*/i, '').trim();
  }
  if (data?.message) return data.message;
  return error?.message || 'Something went wrong';
}
