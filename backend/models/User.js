const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Purchase = new mongoose.Schema({
    quantity: {
        type: Number,
        validate: {
            validator: function(value) {
                return Number.isInteger(value) && value >= 0;
            },
            message: 'A quantidade necessita ser um valor positivo e inteiro.'
        },
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

const User = mongoose.model(
    "User",
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        phone: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean
        },
        cart: [Purchase]

    }, { timestamps: true })
);

module.exports = User;
