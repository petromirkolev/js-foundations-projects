function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

await delay(500);
console.log('done');
