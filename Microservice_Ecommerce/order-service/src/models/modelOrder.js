const mongoose = require("mongoose");

const OrderScema = new mongoose.Schema({
    username: {type : String,  index: {unique: true}},
    orders:[{
    products: [{ productId: mongoose.Types.ObjectId, quantityInCart : Number }],
    createdAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 0, min: 0 },
    cost: { type: Number, default: 0 },
    status: {type: String, default: 'Placed'}}]
});

module.exports = mongoose.model("Order", OrderScema);