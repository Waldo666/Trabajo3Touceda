const express = require("express");
const app = express();
const PUERTO = 8080;

const ProductManager = require("./controllers/product-manager.js");
const { error } = require("console");
const productManager = new ProductManager("./src/models/productos.json");





app.get("/api/products", async (req, res) => {
    
try{
const limit = req.query.limit;
const productos = await productManager.getProducts();

if(limit){
    res.json(productos.slice(0, limit));

}else{
    res.json(productos);
}
}catch (error){
console.error("error al obtener los productos")
res.status(500).json({error:"Error del servidor"});
}
})

app.get("/api/products/:pid", async (req, res) => {
    let id = req.params.pid;
try{
    const producto = await productManager.getProductById(parseInt(id));
if (!producto){
    res.json({
        error: "producto no encontrado"
    });

}else {
    res.json(producto)
}
}catch (error){
    console.error("error al obtener el producto")
    res.status(500).json({error:"Error del servidor"});
}
})

app.listen(PUERTO);