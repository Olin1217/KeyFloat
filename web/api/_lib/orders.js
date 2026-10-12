const crypto = require("node:crypto");
const { getJSONList, privateKey, pushJSONList } = require("./store");

function orderKey(email) {
  return privateKey("orders", email);
}

function publicOrder(order) {
  return {
    id: order.id,
    product: order.product,
    platform: order.platform || "macos",
    amountCny: order.amountCny,
    paymentReference: order.paymentReference,
    voucherCode: order.voucherCode,
    purchasedAt: order.purchasedAt,
    status: order.status || "paid",
    ...(order.downloadURL ? { downloadURL: order.downloadURL } : {}),
  };
}

async function appendOrder(order) {
  const key = orderKey(order.email);
  const current = await getJSONList(key);
  const existing = current.find((item) => item.paymentReference === order.paymentReference);
  if (existing) return publicOrder(existing);
  const stored = {
    ...order,
    id: crypto.createHash("sha256").update(`${order.email}|${order.paymentReference}`).digest("hex").slice(0, 18),
    platform: order.platform || "macos",
    status: "paid",
  };
  await pushJSONList(key, stored);
  return publicOrder(stored);
}

async function listOrders(email) {
  const orders = await getJSONList(orderKey(email));
  const unique = new Map();
  for (const order of orders) {
    if (!unique.has(order.paymentReference)) unique.set(order.paymentReference, order);
  }
  return [...unique.values()].map(publicOrder).sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt));
}

module.exports = { appendOrder, listOrders };
