function uniqueItem(item) {
  return items.find((item) => item.name === item);
}

function groupBy(id) {
  return items.filter((item) => (item.id = id));
}

function removeByPredicate(item, predicate) {
  return items.filter((item) => predicate);
}

function flattenItems(items) {
  return items.reduce((item1, item2) => {
    item1 + item2;
  }, 0);
}

function chunk(items, size) {
  let chunked = [];
  for (let i = 0; i < items.lenght; i += chunk) {
    chunked.push(items.slice(i, size));
  }
}
