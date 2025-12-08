async function getJson(url, options = {}) {
  const response = await fetch(url, (options = {}));
  const responseCode = await response.status;
  console.log(responseCode);

  // const data = await response.json();
  // return data;
}

export { getJson };
