import { promises as fs } from "fs";

// Creamos la clase principal
export default class ProductManager {
  constructor() {
    this.path = "../../products.json";
  }

  // Creamos o borramos el contenido del archivo
  createFile = async () => {
    await fs.writeFile(this.path, "[]");
  };

  // Mostramos los productos
  getProducts = async () => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return data;
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
    // Verificamos que no haya campos vacios u otros tipos de datos
    if (title && description && price && thumbnail && code && stock) {
      if (
        typeof title === "string" &&
        typeof description === "string" &&
        typeof price === "number" &&
        typeof thumbnail === "string" &&
        typeof code === "string" &&
        typeof stock === "number"
      ) {
        data.push(product);
        await fs.writeFile(this.path, JSON.stringify(data, null, "\t"));
      } else {
        console.log(
          "Revise que los valores ingresados en cada campo sean correctos"
        );
      }
    } else {
      console.log("Todos los campos son obligatorios");
    }
  };

  // Buscamos el producto por su id
  getProductById = async (id) => {
    const data = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const product = data.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "Producto no encontrado";
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
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc124",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc125",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc126",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc127",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc128",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc129",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc120",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc121",
  25
);
await productManager1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc122",
  25
);
