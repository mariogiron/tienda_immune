const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/user.model');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewares');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('cart');
        res.json(user);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/register', async (req, res) => {

    // encriptar la password
    req.body.password = bcrypt.hashSync(req.body.password);

    try {
        // Crear el user en la BD
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});

router.post('/login', async (req, res) => {
    // mirar si el usuario con el mail recibido está en la BD
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.json({ fatal: "error en email y/o contraseña" });
    }

    // Compruebo la igualdad de las password
    const eq = bcrypt.compareSync(req.body.password, user.password);
    if (!eq) {
        return res.json({ fatal: "error en email y/o contraseña" });
    }

    res.json({ success: 'Login correcto', token: createToken(user) });
});

router.put('/product/:productId', checkToken, async (req, res) => {
    const { productId } = req.params;

    try {
        const user = await User.findById(req.user._id);
        user.cart.push(productId);
        await user.save();

        res.json(user);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;

// TODO: Diferencias entre entornos
// TODO: Subir aplicación a Render
// TODO: MongoDB Atlas