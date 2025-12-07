function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${ms}ms`);
      reject('Error');
    }, ms);
  });
}

export { delay };
