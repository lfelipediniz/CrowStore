const mongoose = require("../db/conn");
const { Schema } = mongoose;
const Model = require('./Model');

const Purchase = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
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
});

module.exports = Purchase;

const User = mongoose.model(
    "User",
    new Schema(
        {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            image: {
                type: String,
            },
            phone: {
                type: String,
                required: true,
            },
            cpf: {
                type: String,
                required: true,
            },
            admin: {
                type: Boolean,
            },
            cart: [Purchase],
            shopping: [],
        },
        { timestamps: true }
    )
);

module.exports = User;
