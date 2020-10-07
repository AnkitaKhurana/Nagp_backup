const mongoose = require("mongoose");

const ProductScema = new mongoose.Schema({
    name: String,
    type: { type: String, default: "item" },
    createdAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 1, min: 0 },
    cost: { type: Number, default: 0 }
});

module.exports = mongoose.model("Product", ProductScema);