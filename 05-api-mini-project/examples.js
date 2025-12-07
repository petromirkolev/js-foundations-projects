import { getJson } from './apiClient.js';
import { fetchPosts, fetchPostById, fetchUserPosts } from './postService.js';

//
// -------------------------------------------
// POSTS EXAMPLES
// -------------------------------------------
console.log('\n--- POSTS EXAMPLES ---');

async function runPostsExamples() {
  try {
    const posts = await fetchPosts();
    console.log('All posts count:', posts.length);
    // Expect: ~100 (jsonplaceholder returns 100 posts)

    const post5 = await fetchPostById(5);
    console.log('Post 5:', post5);
    // Expect: post5.id === 5

    const user1Posts = await fetchUserPosts(1);
    console.log('User 1 posts count:', user1Posts.length);
    // Expect: ~10 posts where post.userId === 1
  } catch (err) {
    console.log('Unexpected error in POSTS EXAMPLES:', err.message);
    // Expect: not to hit this in normal conditions
  }
}

runPostsExamples();

//
// -------------------------------------------
// ERROR HANDLING EXAMPLES
// -------------------------------------------
console.log('\n--- ERROR HANDLING EXAMPLES ---');

async function runErrorExamples() {
  try {
    const missing = await fetchPostById(9999999);
    console.log('Unexpected success for missing post:', missing);
    // Expect: NOT to run if getJson throws properly on HTTP error
  } catch (err) {
    console.log('Handled error for missing post:', err.message);
    // Expect: error message indicating HTTP error status (e.g. "HTTP error: 404")
  }
}

runErrorExamples();

//
// -------------------------------------------
// ABORT CONTROLLER EXAMPLE
// -------------------------------------------
console.log('\n--- ABORT CONTROLLER EXAMPLE ---');

async function runAbortExample() {
  // You will implement apiClient.getJson so it accepts { signal }.
  const controller = new AbortController();

  const url = 'https://jsonplaceholder.typicode.com/posts';
  const promise = getJson(url, { signal: controller.signal });

  // Abort shortly after starting the request
  setTimeout(() => {
    controller.abort();
    console.log('Abort requested via controller.abort()');
    // Expect: fetch to be aborted, leading to a rejected promise
  }, 10);

  try {
    const data = await promise;
    console.log('Unexpected success after abort:', data.length);
    // Expect: NOT to run if abort works correctly
  } catch (err) {
    console.log('Abort example error:', err.name, '-', err.message);
    // Expect: err.name might be "AbortError" (depending on environment)
  }
}

runAbortExample();
