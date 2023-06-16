const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Product = require('../models/product.model');

const checkToken = async (req, res, next) => {
    // Comprobamos si el token viene en la cabecera
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'Debes incluir la cabecera de Authorization' });
    }

    const token = req.headers['authorization'];

    // Compruebo la validez del token
    let payload;
    try {
        payload = jwt.verify(token, 'con cien cañones por banda');
    } catch (error) {
        return res.json({ fatal: 'El token es incorrecto' });
    }

    // payload (user_id, user_role, user_name, iat)
    req.user = await User.findById(payload.user_id).populate('cart');

    next();
}

const checkProductId = async (req, res, next) => {
    const { productId } = req.params;
    try {
        console.log(productId);
        const product = await Product.findById(productId);

        if (!product) {
            return res.json({ fatal: 'El producto no existe en la BD' });
        }

        next();
    } catch (error) {
        return res.json({ fatal: 'El id del producto tiene un formato incorrecto' });
    }
}

module.exports = { checkToken, checkProductId };