const express = require("express");

const app = express();
app.use(express.json());

const initialProducts = () => [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Mouse", price: 1000 },
  { id: 3, name: "Keyboard", price: 2000 }
];
let products = initialProducts();

const error = (res, status, message) => res.status(status).json({ error: message });
function parseId(value) {
  if (!/^\d+$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
function validateProductFields(body, partial = false) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "Request body must be a JSON object";
  if (!partial || body.name !== undefined) {
    if (typeof body.name !== "string" || body.name.trim().length === 0) return "name must be a non-empty string";
  }
  if (!partial || body.price !== undefined) {
    if (typeof body.price !== "number" || !Number.isFinite(body.price) || body.price < 0) return "price must be a non-negative number";
  }
  if (partial && body.name === undefined && body.price === undefined) return "At least one of name or price is required";
  return null;
}

app.get("/", (req, res) => res.json({ message: "Product REST API", endpoints: ["GET /products", "GET /products/:id", "POST /products", "PUT /products/:id", "DELETE /products/:id"] }));
app.get("/products", (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search.trim().toLowerCase() : "";
  res.json(search ? products.filter((product) => product.name.toLowerCase().includes(search)) : products);
});
app.get("/products/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return error(res, 400, "id must be a positive integer");
  const product = products.find((item) => item.id === id);
  if (!product) return error(res, 404, "Product not found");
  res.json(product);
});
app.post("/products", (req, res) => {
  const validationError = validateProductFields(req.body);
  if (validationError) return error(res, 400, validationError);
  const product = { id: products.length ? Math.max(...products.map((item) => item.id)) + 1 : 1, name: req.body.name.trim(), price: req.body.price };
  products.push(product);
  res.status(201).json(product);
});
app.put("/products/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return error(res, 400, "id must be a positive integer");
  const product = products.find((item) => item.id === id);
  if (!product) return error(res, 404, "Product not found");
  const validationError = validateProductFields(req.body, true);
  if (validationError) return error(res, 400, validationError);
  if (req.body.name !== undefined) product.name = req.body.name.trim();
  if (req.body.price !== undefined) product.price = req.body.price;
  res.json(product);
});
app.delete("/products/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return error(res, 400, "id must be a positive integer");
  const originalLength = products.length;
  products = products.filter((item) => item.id !== id);
  if (products.length === originalLength) return error(res, 404, "Product not found");
  res.status(204).send();
});
app.use((req, res) => error(res, 404, "Route not found"));

function resetProducts() { products = initialProducts(); }
if (require.main === module) {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
module.exports = { app, resetProducts };
