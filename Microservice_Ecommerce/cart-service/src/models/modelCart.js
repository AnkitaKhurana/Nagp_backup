const mongoose = require("mongoose");

const CartScema = new mongoose.Schema({
    username: {type : String,  index: {unique: true}},
    products: [{ productId: mongoose.Types.ObjectId, quantityInCart : Number }],
    createdAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 0, min: 0 },
    cost: { type: Number, default: 0 }
});

module.exports = mongoose.model("Cart", CartScema);