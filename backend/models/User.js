const mongoose = require("../db/conn");
const { Schema } = mongoose;
const Item = require('./Item');

const UserSchema = new Schema(
    {
        _id: mongoose.Types.ObjectId,
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
        cart: {
            type: [Item],
            sparse: true
        },
    }, { timestamps: true }
);

const User = mongoose.model("User", UserSchema)

module.exports = User;
