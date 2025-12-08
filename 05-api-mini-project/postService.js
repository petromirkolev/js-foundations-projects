import { getJson } from './apiClient.js';
const url = 'https://jsonplaceholder.typicode.cosm/posts';

async function fetchPosts() {
  return getJson(url);
}
function fetchPostById() {}
function fetchUserPosts() {}

console.log(await fetchPosts());

export { fetchPosts, fetchPostById, fetchUserPosts };
