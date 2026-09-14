const assert = require("node:assert/strict");
const { test, before, after, beforeEach } = require("node:test");
const { app, resetProducts } = require("./index");

let server;
let baseUrl;
before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());
beforeEach(() => resetProducts());

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { "content-type": "application/json", ...(options?.headers || {}) }
  });
  const text = await response.text();
  return { response, body: text ? JSON.parse(text) : null };
}

test("GET /products returns all products and supports search", async () => {
  const all = await request("/products");
  assert.equal(all.response.status, 200);
  assert.equal(all.body.length, 3);
  const filtered = await request("/products?search=mouse");
  assert.deepEqual(filtered.body, [{ id: 2, name: "Mouse", price: 1000 }]);
});
test("GET / returns API information", async () => {
  const result = await request("/");
  assert.equal(result.response.status, 200);
  assert.equal(result.body.message, "Product REST API");
});
test("GET /products/:id returns a product and handles invalid IDs", async () => {
  assert.deepEqual((await request("/products/1")).body, { id: 1, name: "Laptop", price: 50000 });
  assert.equal((await request("/products/99")).response.status, 404);
  assert.equal((await request("/products/nope")).response.status, 400);
});
test("POST /products creates a product and validates input", async () => {
  const created = await request("/products", { method: "POST", body: JSON.stringify({ name: "Monitor", price: 12000 }) });
  assert.equal(created.response.status, 201);
  assert.deepEqual(created.body, { id: 4, name: "Monitor", price: 12000 });
  assert.equal((await request("/products", { method: "POST", body: JSON.stringify({ name: "", price: -1 }) })).response.status, 400);
});
test("PUT /products/:id updates fields and validates input", async () => {
  const updated = await request("/products/2", { method: "PUT", body: JSON.stringify({ price: 1500 }) });
  assert.deepEqual(updated.body, { id: 2, name: "Mouse", price: 1500 });
  assert.equal((await request("/products/2", { method: "PUT", body: JSON.stringify({}) })).response.status, 400);
  assert.equal((await request("/products/99", { method: "PUT", body: JSON.stringify({ price: 1 }) })).response.status, 404);
});
test("DELETE /products/:id deletes a product", async () => {
  const deleted = await request("/products/3", { method: "DELETE" });
  assert.equal(deleted.response.status, 204);
  assert.equal((await request("/products/3")).response.status, 404);
  assert.equal((await request("/products/3", { method: "DELETE" })).response.status, 404);
});
test("unknown routes return JSON 404", async () => {
  const result = await request("/unknown");
  assert.equal(result.response.status, 404);
  assert.deepEqual(result.body, { error: "Route not found" });
});
