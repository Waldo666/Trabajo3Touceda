const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async addProduct({ title, description, price, img, code, stock }) {
    // Validaciones de los campos
    if (!title || !description || !price || !img || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }
    if (this.products.some(item => item.code === code)) {
      console.error("El código debe ser único");
      return;
    }

    // Crear nuevo producto y guardarlo
    const newProduct = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      code,
      stock,
    };
    this.products.push(newProduct);
    await this.guardarArchivo();
  }

  async getProducts() {
    return await this.leerArchivo();
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find(item => item.id === id);

      if (buscado) {
        return buscado;
      } else {
        console.log("No existe el producto buscado");
      }
    } catch (error) {
      console.error("Error al buscar el producto", error);
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.error("Error al leer el archivo", error);
    }
  }

  async guardarArchivo() {
    try {
      await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error("Error al guardar el archivo", error);
    }
  }
}


module.exports = ProductManager;