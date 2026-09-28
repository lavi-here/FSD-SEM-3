const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.json());

const productsFile = path.join(__dirname, "products.json");

// GET products
app.get("/api/products", (req, res) => {
  const data = fs.readFileSync(productsFile, "utf-8");

  const products = JSON.parse(data);

  res.json(products);
});

// POST product
app.post("/api/products", (req, res) => {
  const data = fs.readFileSync(productsFile, "utf-8");

  const products = JSON.parse(data);

  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  products.push(newProduct);

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  res.json(newProduct);
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
  const data = fs.readFileSync(productsFile, "utf-8");

  let products = JSON.parse(data);

  const id = parseInt(req.params.id);

  products = products.filter((product) => product.id !== id);

  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));

  res.json({
    message: "Product deleted successfully",
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
