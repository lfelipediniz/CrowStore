const mongoose = require('../db/conn')
const {Schema} = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({

        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        colors: {
            type: Array,
            required: true
        },
        size: {
            type: Array,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
    },{timestamps: true},
    ),
)