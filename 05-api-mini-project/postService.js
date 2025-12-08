import { getJson } from './apiClient.js';
const url = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts() {
  return getJson(url);
}
async function fetchPostById(id) {
  const posts = await getJson(`${url}/${id}`);
  return posts;
}
async function fetchUserPosts(id) {
  const posts = await getJson(`${url}?userId=${id}`);
  return posts;
}

export { fetchPosts, fetchPostById, fetchUserPosts };
