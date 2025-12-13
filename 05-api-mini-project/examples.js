import { getJson } from './apiClient.js';
import { fetchPosts, fetchPostById, fetchUserPosts } from './postService.js';

// -------------------------------------------
// POSTS EXAMPLES
// -------------------------------------------
console.log('\n--- POSTS EXAMPLES ---');

async function runPostsExamples() {
  try {
    const posts = await fetchPosts();
    console.log('All posts count:', posts.length);

    const post5 = await fetchPostById(5);
    console.log('Post 5:', post5);

    const user1Posts = await fetchUserPosts(1);
    console.log('User 1 posts count:', user1Posts.length);
  } catch (err) {
    console.log('Unexpected error in POSTS EXAMPLES:', err.message);
  }
}

runPostsExamples();

// -------------------------------------------
// ERROR HANDLING EXAMPLES
// -------------------------------------------
console.log('\n--- ERROR HANDLING EXAMPLES ---');

async function runErrorExamples() {
  try {
    const missing = await fetchPostById(9999999);
    console.log('Unexpected success for missing post:', missing);
  } catch (err) {
    console.log('Handled error for missing post:', err.message);
  }
}

runErrorExamples();

// -------------------------------------------
// ABORT CONTROLLER EXAMPLE
// -------------------------------------------
console.log('\n--- ABORT CONTROLLER EXAMPLE ---');

async function runAbortExample() {
  const controller = new AbortController();
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const promise = getJson(url, { signal: controller.signal });

  setTimeout(() => {
    controller.abort();
    console.log('Abort requested via controller.abort()');
  }, 10);

  try {
    const data = await promise;
    console.log('Unexpected success after abort:', data.length);
  } catch (err) {
    console.log('Abort example error:', err.name, '-', err.message);
  }
}

runAbortExample();
