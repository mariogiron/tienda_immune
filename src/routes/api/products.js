const router = require('express').Router();

const { checkProductId } = require('../../helpers/middlewares');
const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('owner');
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:productId', checkProductId, async (req, res) => {
    // const productId = req.params.productId;
    const { productId } = req.params;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.delete('/:productId', checkProductId, async (req, res) => {
    const { productId } = req.params;

    try {
        const deleteProduct = await Product.findByIdAndDelete(productId);
        res.json(deleteProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;