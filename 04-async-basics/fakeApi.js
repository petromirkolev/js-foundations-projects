const users = [
  { id: 'u1', name: 'Mihaela' },
  { id: 'u2', name: 'Zdravko' },
  { id: 'u3', name: 'Ivaylo' },
];

const orders = [
  { id: 'o1', userId: 'u1', total: 50 },
  { id: 'o2', userId: 'u1', total: 30 },
  { id: 'o3', userId: 'u2', total: 20 },
];

function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = users.find((user) => user.id === userId);
      if (!found) {
        reject(new Error('User not found'));
      } else {
        resolve(found);
      }
    }, 500);
  });
}

function fetchOrders(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = orders.filter((user) => user.userId === userId);
      resolve(found);
    }, 500);
  });
}

async function fetchDashboard(userId) {
  const user = await fetchUser(userId);
  const userOrders = await fetchOrders(userId);
  const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
  return { user: user, orders: userOrders, totalSpent };
}

export { fetchUser, fetchOrders, fetchDashboard };
