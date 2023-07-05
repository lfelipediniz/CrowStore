const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Model = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    productId: {
        type: String,
        retuired: true
    },
    size: {
        type: String,
        enum: ['PP', 'P', 'M', 'G', 'XG'],
        required: true
    },
    color: {
        type: String,
        enum: ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'],


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
Model.index({ productId: 1, size: 1, color: 1 }, { unique: true });

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
