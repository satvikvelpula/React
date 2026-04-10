export const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  let json;

  try {
    json = await response.json();
  } catch (error) {
    json = null;
  }

  if (!response.ok) {
    throw new Error(json?.message || 'Request failed');
  }

  return json;
};
