const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/creacion', async (req, res) => {
    const product = await Product.create({
        name: 'Camisa',
        description: 'Para vestir',
        price: 29,
        stock: 10,
        department: 'moda',
        available: false
    });
    res.json(product);
});

router.get('/recuperacion', async (req, res) => {
    const products = await Product.find({
        available: true,
        stock: { $lt: 50 } // $gt, $gte, $lt, $lte, $eq, $in
    });
    // SELECT * FROM products WHERE available = true AND stock > 50
    res.json(products);
});

router.get('/creacion_v2', async (req, res) => {
    const prod = new Product();
    prod.name = 'Sartén';
    prod.price = 35;
    prod.available = true;
    prod.department = 'cocina';
    prod.stock = 38;
    await prod.save();
    res.json(prod);
});

router.get('/actualizar', async (req, res) => {
    // const prod = await Product.findOne({ _id: '6489ef70bb6af8f1bb9e4782' });
    const prod = await Product.findById('6489ef70bb6af8f1bb9e4782')
    prod.price = 330;
    await prod.save();
    res.json(prod);
});

router.get('/actualizar_v2', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate('6489ef70bb6af8f1bb9e4782', {
        stock: 150,
        department: 'hogar'
    }, { new: true });
    res.json(updatedProduct);
});

router.get('/actualizar_v3', async (req, res) => {
    const result = await Product.updateMany({ available: false }, {
        available: true,
        stock: 100
    });
    res.json(result);
});

router.get('/borrar', async (req, res) => {
    const prodDeleted = await Product.findByIdAndDelete('6489ef70bb6af8f1bb9e4782');
    if (prodDeleted) {
        res.json(prodDeleted);
    } else {
        res.json({ message: 'El producto no existe' });
    }
});

module.exports = router;