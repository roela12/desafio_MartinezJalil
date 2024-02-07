import { promises as fs } from "fs";

// Creamos la clase principal
class ProductManager {
  constructor() {
    this.path = "./products.json";
  }

  // Creamos o borramos el contenido del archivo
  createFile = async () => {
    await fs.writeFile(this.path, "[]");
  };

  // Mostramos los productos
  getProducts = async () => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log("Productos:", data);
  };

  // Agregamos un nuevo producto al array de productos
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    // Verificamos que el id no se repita
    let count = 1;
    while (data.find((product) => product.id === count)) {
      count++;
    }
    const product = {
      id: count,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    // Verificamos que el codigo no se repita
    if (data.find((product) => product.code === code)) {
      return console.log(
        `El codigo ${code} ya existe, el producto no se ha agregado`
      );
    }
    // Verificamos que no haya campos vacios
    if (title && description && price && thumbnail && code && stock) {
      data.push(product);
      await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
    } else {
      console.log("Todos los campos son obligatorios");
    }
  };

  // Buscamos el producto por su id
  getProductById = async (id) => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = data.find((product) => product.id === id);
    if (product) {
      return console.log("Resultado de la busqueda:", product);
    } else {
      return console.log("Producto no encontrado");
    }
  };

  // Actualizamos un producto en base a su id
  updateProduct = async (id, property, value) => {
    let data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = data.find((product) => product.id === id);
    if (product) {
      data = data.filter((products) => products.id != id);
      product[property] = value;
      data.push(product);
      await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
      return console.log("Producto actualizado con exito");
    } else {
      return console.log("Producto no encontrado");
    }
  };

  // Borramos un producto en base a su id
  deleteProduct = async (id) => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = data.find((product) => product.id === id);
    if (product) {
      const newData = data.filter((products) => products.id != id);
      await fs.writeFile(this.path, JSON.stringify(newData, null, "\t"));
      return console.log("Producto borrado con exito");
    } else {
      return console.log("Producto no encontrado");
    }
  };
}

// Proceso de testing
const productManager1 = new ProductManager();
await productManager1.createFile();
await productManager1.getProducts();
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
await productManager1.getProducts();
await productManager1.getProductById(1);
await productManager1.updateProduct(1, "title", "Nuevo titulo");
await productManager1.deleteProduct(1);
