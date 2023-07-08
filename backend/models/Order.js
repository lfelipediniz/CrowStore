const mongoose = require("../db/conn");
const { Schema } = mongoose;
const Item = require('./Item');

const Order = new Schema({
    Items: {
        type: [Item],
        required: true
    },
    Quantities: {
        type: Array,
        required: true
    },
    TotalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    cep: {
        type: Number,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
},
);

const OrderModel = mongoose.model('Order', Order);

module.exports = OrderModel;



