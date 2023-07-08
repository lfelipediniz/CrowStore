const mongoose = require("../db/conn");
const { Schema } = mongoose;
const Model = require('./Model');

const Item = new Schema({
    productId: {
        type: String,
        required: true
    },
    model: {
        type: Model,
        required: true
    },
    quantity: {
        type: Number,
        validate: {
            validator: function(value) {
                return Number.isInteger(value) && value >= 1 && value <= this.model.quantity;
            },
            message: 'A quantidade deve ser um número inteiro maior ou igual a 1 e menor ou igual à quantidade disponível para esse modelo.'
        },
        required: true
    }
}, { timestamps: true });

module.exports = Item;
