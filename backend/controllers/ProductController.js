const mongoose = require('../db/conn');
const Product = require('../models/Product')
const { upload } = require('../imguploadconfig/multer.js');

module.exports = class ProductController {
    static async addProduct(req, res) {
        upload.array('images')(req, res, async function(err) {
            if (err) {
                return res.status(500).json({ message: 'Houve um erro ao enviar imagens' });
            }
            const { name, tags, gender, price } = req.body
            const images = req.files.map((file) => file.filename);

            console.log(req.body);
            console.log(req.files);

            try {
                if (!name) {
                    throw new Error('O produto necessita ser nomeado');
                }

                const existingType = await Product.findOne({ name });
                if (existingType) {
                    throw new Error('Já existe um produto com o mesmo nome');
                }

                if (!tags || tags.length === 0) {
                    throw new Error('O produto necessita estar associado a pelo menos uma categoria');
                }

                if (!['Masculino', 'Feminino', 'Unissex'].includes(gender)) {
                    throw new Error('O produto necessita ser classificado em um gênero válido');
                }

                if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
                    throw new Error('O produto necessita ter um preço qualquer positivo');
                }

                if (!images || images.length === 0) {
                    throw new Error('É necessário fornecer pelo menos uma imagem do produto');
                }

                const newType = new Product({
                    _id: new mongoose.Types.ObjectId(),
                    name,
                    tags,
                    gender,
                    price,
                    images
                });

                await newType.save();

                res.status(200).json({ message: 'Produto adicionado com sucesso' });
            } catch (error) {
                res.status(422).json({ message: error.message });
            }
        });
    }

    static async addModel(req, res) {
        const { id, size, color, quantity } = req.body;

        try {
            const product = await Product.findById(id);

            if (!product) {
                throw new Error('Produto não encontrado');
            }

            const validSizes = ['PP', 'P', 'M', 'G', 'XG'];
            if (!validSizes.includes(size)) {
                throw new Error('Tamanho inválido');
            }

            const validColors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

            if (!validColors.includes(color)) {
                throw new Error('A cor fornecida é inválida');
            }

            const parsedQuantity = parseInt(quantity);
            if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
                throw new Error('Quantidade inválida');
            }

            const existingModel = product.AvailableModels.find(model => model.size === size && model.color === color);
            if (existingModel) {
                throw new Error('Já existe um modelo com o mesmo tamanho e cor');
            }

            const newModel = {
                _id: new mongoose.Types.ObjectId(),
                size,
                color,
                quantity: parsedQuantity
            };

            product.AvailableModels.push(newModel);

            await product.save();

            res.status(200).json({ message: 'Modelo adicionado com sucesso' });
        } catch (error) {
            res.status(422).json({ message: error.message });
        }
    }

    static async getProducts(req, res) {
        try {
            const products = await Product.find();

            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar os produtos' });
        }
    }

    static async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({ message: `O produto de id ${req.params.id} não foi encontrado.` });
            }

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível recuperar os produtos', error: error.message });
        }
    }

    static async getModels(req, res) {

        try {
            const product = await Product.findById(req.params.productId);

            if (!(product && product.AvailableModels)) {
                return res.status(404).json({ message: `Modelos para o produto de id ${req.params.id} não foram encontrados` });
            }
            return res.status(200).json(product.AvailableModels);

        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível recuperar os modelos', error: error.message });
        }
    }

    static async getModelByIds(req, res) {
        try {
            const product = await Product.findById(req.params.productId);

            if (!product) {
                return res.status(404).json({ message: `O produto de id ${req.params.productId} não foi encontrado` });
            }

            const model = product.AvailableModels.id(req.params.modelId);

            if (!model) {
                return res.status(404).json({ message: `O modelo de id ${req.params.modelId} não foi encontrado` });
            }

            return res.status(200).json(model);
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível recuperar o modelo', error: error.message });
        }
    }

    static async dropProducts(req, res) {
        try {
            await Product.deleteMany();

            res.status(200).json({ message: 'Todos os produtos, se algum, foram apagados com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível apagar os produtos' });
        }
    }

    static async dropModels(req, res) {
        try {
            const product = await Product.findById(req.params.productId);

            if (!product) {
                return res.status(404).json({ message: `O produto de id ${req.params.modelId} não foi encontrado` });
            }

            product.AvailableModels = [];

            await product.save();

            return res.status(200).json({ message: `Todos os modelos, se algum, do produto ${req.params.productId} foram apagados` });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível apagar os modelos', error: error.message });
        }
    }

    static async removeProduct(req, res) {
        try {
            const productId = req.params.productId;

            const product = await Product.findByIdAndDelete(productId);

            if (!product) {
                return res.status(404).json({ message: `O produto de id ${req.params.modelId} não foi encontrado` });
            }

            return res.status(200).json({ message: 'Produto removido com sucesso', product });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível apagar o produto', error: error.message });
        }
    }


    static async removeModel(req, res) {
        try {
            const productId = req.params.productId;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: `O produto de id ${productId} não foi encontrado` });
            }

            const modelId = req.params.modelId;

            const modelIndex = product.AvailableModels.findIndex(model => model._id.toString() === modelId);

            if (modelIndex === -1) {
                return res.status(404).json({ message: `O modelo de id ${modelId} não foi encontrado` });
            }

            product.AvailableModels.splice(modelIndex, 1);

            await product.save();

            return res.status(200).json({ message: `O Modelo de id ${modelId} foi removido com sucesso`, product });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível apagar o modelo', error: error.message });
        }
    }


    static async updateProduct(req, res) {
        const { productId } = req.params;
        const updates = req.body;

        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `O produto de id ${productId} não foi encontrado` });
            }

            const existingKeys = Object.keys(product.toObject());
            const updateKeys = Object.keys(updates);
            const invalidKeys = updateKeys.filter((key) => !existingKeys.includes(key));

            if (invalidKeys.length > 0) {
                return res.status(400).json({ message: `As seguintes chaves são inválidas e serão ignoradas: ${invalidKeys.join(', ')}` });
            }

            Object.keys(updates).forEach((key) => {
                product[key] = updates[key];
            });

            await product.save();

            return res.status(200).json({ message: 'Produto atualizado com sucesso', product });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível atualizar o produto', error: error.message });
        }
    }

    static async updateModel(req, res) {
        try {
            const productId = req.params.productId;
            const modelId = req.params.modelId;
            const updateData = req.body;

            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: `O produto de id ${productId} não foi encontrado` });
            }

            const model = product.AvailableModels.find(model => model._id.toString() === modelId);

            if (!model) {
                return res.status(404).json({ message: `O modelo de id ${modelId} não foi encontrado` });
            }

            const validKeys = Object.keys(updateData).every(key => model.schema.paths.hasOwnProperty(key));
            if (!validKeys) {
                return res.status(400).json({ message: 'Chaves inválidas foram passadas no pedido de atualização' });
            }

            Object.entries(updateData).forEach(([key, value]) => {
                model[key] = value;
            });

            await product.save();

            return res.status(200).json({ message: `Modelo atualizado com sucesso`, model });
        } catch (error) {
            return res.status(500).json({ message: 'Não foi possível atualizar o modelo', error: error.message });
        }
    }
}
