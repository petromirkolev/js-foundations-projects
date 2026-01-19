const API_URL = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts(options = {}) {
  const { signal } = options;
  const response = await fetch(API_URL, { signal });
  if (!response.ok) {
    throw new Error(`Fetch failed with response code ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export { API_URL, fetchPosts };
