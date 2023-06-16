const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    stock: Number,
    available: Boolean,
    owner: { type: Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('product', productSchema);