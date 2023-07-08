const mongoose = require("../db/conn");
const { Schema } = mongoose;
const Model = require('./Model');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String
  },
  size: {
    type: String
  },
  quantity: {
    type: Number,
    required: true
  }
});

const Purchase = new Schema({
  product: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    color: {
      type: String
    },
    size: {
      type: String
    },
    quantity: {
      type: Number,
      required: true
    }
  },
  quantity: {
    type: Number,
    validate: {
      validator: function(value) {
        return Number.isInteger(value) && value >= 1 && value <= this.product.quantity;
      },
      message:
        'A quantidade deve ser um número inteiro maior ou igual a 1 e menor ou igual à quantidade disponível para esse produto.'
    },
    required: true
  }
}, { timestamps: true });

const UserSchema = new Schema(
  {
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
    cart: {
      type: [Purchase],
      sparse: true
    },
    shopping: {
      type: [Purchase],
      sparse: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
