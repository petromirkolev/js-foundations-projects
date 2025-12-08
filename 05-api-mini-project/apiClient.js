async function getJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw Error(response.status);
  }
  const data = await response.json();
  return data;
}

export { getJson };
