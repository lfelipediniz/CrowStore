const mongoose = require('../db/conn');
const { Schema } = mongoose;

const ClothingModel = new mongoose.Schema({
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
});

const ClothingTypeSchema = new Schema({
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
    AvailableModels: [ClothingModel]
}, { timestamps: true });

const ClothingType = mongoose.model('ClothingType', ClothingTypeSchema);

module.exports = ClothingType;
