const mongoose = require("../db/conn");
const { Schema } = mongoose;

const Order = new Schema({
  Products: {
    type: Array,
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
  adress: {
    type: String,
    required: true
  },
  cep: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
},
);

const OrderModel = mongoose.model('Order', Order);

module.exports = OrderModel;



