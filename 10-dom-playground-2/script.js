// // Drill 1
// function delay(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

// await delay(500);
// console.log('done');

// // Drill 2
// async function fetchJson(url) {
//   let response = await fetch(url);
//   if (!response.ok) throw Error('Error while fetching.');
//   return response.json();
// }
