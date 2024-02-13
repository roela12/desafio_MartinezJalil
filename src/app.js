import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
const port = 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();
const getProducts = productos.getProducts();

// Rutas
app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await getProducts);
  let allProducts = await getProducts;
  let limitProducts = allProducts.slice(0, limit);
  res.send(limitProducts);
});

app.get("/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  res.send(await productos.getProductById(id));
});

app.listen(port, () => console.log("Servidor corriendo en el puerto", port));
