const mongoose = require('../db/conn');
const Product = require('../models/Product')

module.exports = class ProductController {
    static async addProduct(req, res) {
        const { name, tags, gender, price, images } = req.body

        try {
            // Check if the name is not empty and there is no other ClothingType with the same name
            if (!name) {
                throw new Error('O produto necessita ser nomeado');
            }

            const existingType = await Product.findOne({ name });
            if (existingType) {
                throw new Error('Já existe um produto com o mesmo nome');
            }

            // Check if tags, gender, and price have valid values
            if (!tags || tags.length === 0) {
                throw new Error('O produto necessita estar associado a pelo menos uma categoria');
            }

            if (!['Masculino', 'Feminino', 'Unissex'].includes(gender)) {
                throw new Error('O produto necessita ser classificado em um gênero válido');
            }

            if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
                throw new Error('O produto necessita ter um preço qualquer positivo');
            }

            // Check if images is not empty
            if (!images || images.length === 0) {
                throw new Error('É necessário fornecer pelo menos uma imagem do produto');
            }

            // Create a new ClothingType object
            const newType = new Product({
                _id: new mongoose.Types.ObjectId(),
                name,
                tags,
                gender,
                price,
                images
            });

            // Save the new ClothingType object to the database
            await newType.save();

            // Send a success response
            res.status(200).json({ message: 'Produto adicionado com sucesso' });
        } catch (error) {
            // Send an error response
            res.status(422).json({ message: error.message });
        }
    }

    static async addModel(req, res) {
        const { id, size, color, quantity } = req.body;

        try {
            // Find the product by ID
            const product = await Product.findById(id);

            if (!product) {
                throw new Error('Produto não encontrado');
            }

            // Check if size is valid
            const validSizes = ['PP', 'P', 'M', 'G', 'XG'];
            if (!validSizes.includes(size)) {
                throw new Error('Tamanho inválido');
            }

            // Check if the color is valid
            const validColors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

            if (!validColors.includes(color)) {
                throw new Error('A cor fornecida é inválida');
            }

            // Check if quantity is a positive integer
            const parsedQuantity = parseInt(quantity);
            if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
                throw new Error('Quantidade inválida');
            }

            // Check if a model with the same size and color already exists
            const existingModel = product.AvailableModels.find(model => model.size === size && model.color === color);
            if (existingModel) {
                throw new Error('Já existe um modelo com o mesmo tamanho e cor');
            }

            // Create a new Model object
            const newModel = {
                _id: new mongoose.Types.ObjectId(),
                size,
                color,
                quantity: parsedQuantity
            };

            // Add the new model to the product's AvailableModels array
            product.AvailableModels.push(newModel);

            // Save the updated product
            await product.save();

            // Send a success response
            res.status(200).json({ message: 'Modelo adicionado com sucesso' });
        } catch (error) {
            // Send an error response
            res.status(422).json({ message: error.message });
        }
    }

    static async getProducts(req, res) {
        try {
            // Retrieve all Product objects from the database
            const products = await Product.find();

            // Send the list of products as a response
            res.status(200).json(products);
        } catch (error) {
            // Send an error response
            res.status(500).json({ message: 'Erro ao buscar os produtos' });
        }
    }

    static async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);

            if (!product) {
                // Product with the given ID not found
                return res.status(404).json({ message: `O produto de id ${req.params.id} não foi encontrado.` });
            }

            // Return the product object
            return res.status(200).json(product);
        } catch (error) {
            // Error occurred while querying the database
            return res.status(500).json({ message: 'Não foi possível recuperar os produtos', error: error.message });
        }
    }

    static async getModels(req, res) {

        try {
            const product = await Product.findById(req.params.productId);

            if (!(product && product.AvailableModels)) {
                // Product with the given ID not found
                return res.status(404).json({ message: `Modelos para o produto de id ${req.params.id} não foram encontrados` });
            }
            // Return the AvailableModels contents
            return res.status(200).json(product.AvailableModels);

        } catch (error) {
            // Error occurred while querying the database
            return res.status(500).json({ message: 'Não foi possível recuperar os modelos', error: error.message });
        }
    }

    static async getModelByIds(req, res) {
        try {
            const product = await Product.findById(req.params.productId);

            if (!product) {
                // Product with the given ID not found
                return res.status(404).json({ message: `O produto de id ${req.params.productId} não foi encontrado` });
            }

            const model = product.AvailableModels.id(req.params.modelId);

            if (!model) {
                // Model with the given ID not found
                return res.status(404).json({ message: `O modelo de id ${req.params.modelId} não foi encontrado` });
            }

            // Return the model object
            return res.status(200).json(model);
        } catch (error) {
            // Error occurred while querying the database
            return res.status(500).json({ message: 'Não foi possível recuperar o modelo', error: error.message });
        }
    }

    static async dropProducts(req, res) {
        try {
            // Delete all Product objects
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
                // Product with the given ID not found
                return res.status(404).json({ message: `O produto de id ${req.params.modelId} não foi encontrado` });
            }

            // Set AvailableModels to an empty array
            product.AvailableModels = [];

            // Save the updated product to the database
            await product.save();

            // Return a success response
            return res.status(200).json({ message: `Todos os modelos, se algum, do produto ${req.params.productId} foram apagados` });
        } catch (error) {
            // Error occurred while updating the product
            return res.status(500).json({ message: 'Não foi possível apagar os modelos', error: error.message });
        }
    }

    static async removeProduct(req, res) {
        try {
            const productId = req.params.productId;

            const product = await Product.findByIdAndDelete(productId);

            if (!product) {
                // Product with the given ID not found
                return res.status(404).json({ message: `O produto de id ${req.params.modelId} não foi encontrado` });
            }

            // Return a success response
            return res.status(200).json({ message: 'Produto removido com sucesso', product });
        } catch (error) {
            // Error occurred while deleting the product
            return res.status(500).json({ message: 'Não foi possível apagar o produto', error: error.message });
        }
    }


    static async removeModel(req, res) {
        try {
            const productId = req.params.productId;
            const product = await Product.findById(productId);

            if (!product) {
                // Product with the given ID not found
                return res.status(404).json({ message: `O produto de id ${productId} não foi encontrado` });
            }

            const modelId = req.params.modelId;

            // Find the index of the model to be removed
            const modelIndex = product.AvailableModels.findIndex(model => model._id.toString() === modelId);

            if (modelIndex === -1) {
                // Model with the given ID not found
                return res.status(404).json({ message: `O modelo de id ${modelId} não foi encontrado` });
            }

            // Remove the model from the AvailableModels array
            product.AvailableModels.splice(modelIndex, 1);

            // Save the updated product to the database
            await product.save();

            // Return a success response
            return res.status(200).json({ message: `O Modelo de id ${modelId} foi removido com sucesso`, product });
        } catch (error) {
            // Error occurred while updating the product
            return res.status(500).json({ message: 'Não foi possível apagar o modelo', error: error.message });
        }
    }


    static async updateProduct(req, res) {
        const { productId } = req.params;
        const updates = req.body;

        try {
            // Check if the product exists
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `O produto de id ${productId} não foi encontrado` });
            }

            // Check if all keys being changed already exist
            const existingKeys = Object.keys(product.toObject());
            const updateKeys = Object.keys(updates);
            const invalidKeys = updateKeys.filter((key) => !existingKeys.includes(key));

            if (invalidKeys.length > 0) {
                return res.status(400).json({ message: `As seguintes chaves são inválidas e serão ignoradas: ${invalidKeys.join(', ')}` });
            }

            // Update the existing keys of the product
            Object.keys(updates).forEach((key) => {
                product[key] = updates[key];
            });

            // Save the updated product
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
                // Product with the given ID not found
                return res.status(404).json({ message: `O produto de id ${productId} não foi encontrado` });
            }

            // Find the model to be updated
            const model = product.AvailableModels.find(model => model._id.toString() === modelId);

            if (!model) {
                // Model with the given ID not found
                return res.status(404).json({ message: `O modelo de id ${modelId} não foi encontrado` });
            }

            // Validate if all keys in updateData exist in the model schema
            const validKeys = Object.keys(updateData).every(key => model.schema.paths.hasOwnProperty(key));
            if (!validKeys) {
                // Invalid keys provided in the update data
                return res.status(400).json({ message: 'Chaves inválidas foram passadas no pedido de atualização' });
            }

            // Update the values of matching keys
            Object.entries(updateData).forEach(([key, value]) => {
                model[key] = value;
            });

            // Save the updated product to the database
            await product.save();

            // Return a success response
            return res.status(200).json({ message: `Modelo atualizado com sucesso`, model });
        } catch (error) {
            // Error occurred while updating the model
            return res.status(500).json({ message: 'Não foi possível atualizar o modelo', error: error.message });
        }
    }
}
