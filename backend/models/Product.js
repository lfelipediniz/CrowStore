const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Model = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    size: {
        type: String,
        enum: ['PP', 'P', 'M', 'G', 'XG'],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        validate: {
            validator: function(value) {
                return Number.isInteger(value) && value >= 0;
            },
            message: 'A quantidade necessita ser um valor positivo e inteiro.'
        },
        required: true
    }
}, { timestamps: true });

// Define a compound index for size and color
Model.index({ size: 1, color: 1 }, { unique: true });

const Product = new Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    gender: {
        type: String,
        enum: ['Masculino', 'Feminino', 'Unissex'],
        required: true
    },
    price: {
        type: Number,
        validate: {
            validator: function(value) {
                return value >= 0;
            },
            message: 'O preço necessita ser um valor positivo'
        },
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    AvailableModels: [Model]
}, { timestamps: true });

const ProductModel = mongoose.model('Product', Product);

module.exports = ProductModel;
