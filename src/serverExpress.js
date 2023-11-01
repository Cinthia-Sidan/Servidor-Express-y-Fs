const express = require('express');

const PORT = 8080;
const app = express();
const fs = require('fs');
const Contenedor = require("../productos.js");

const productos = new Contenedor("./productos.json");





app.get('/products', async (req, res) => {
    try {
        //obtengo el valor de limit o lo dejo indefinido
        const limit = parseInt(req.query.limit) || undefined;
        const products = await productos.getAll();

        // Aplica el límite si se proporciona un valor válido para 'limit'
        const limitedProducts = limit ? products.slice(0, limit) : products;

        res.json(limitedProducts);
    }
    catch (error) {
        res.status(500).send("Error al obtener los productos");
    }
});

app.get('/products/:pid', async (req, res) => {
        const pid = req.params.pid;
        console.log(pid)

        const product = await productos.getById(pid);

        if (product == null) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        return res.json(product);

    
   
});

const server = app.listen(PORT, () => {
    console.log(`Server on line en puerto ${PORT}`)
})
