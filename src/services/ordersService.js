// Very simple in-memory store for demo purposes
const _orders = new Map();
let _nextId = 1;

export function listOrders () {
  return Array.from(_orders.values());
}

export function createOrder ({ item, quantity }) {
  const id = String(_nextId++);
  const record = { id, item, quantity, createdAt: new Date().toISOString() };
  _orders.set(id, record);
  return record;
}

export function getOrderById (id) {
  return _orders.get(String(id)) || null;
}
