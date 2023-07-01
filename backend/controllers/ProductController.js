const Product = require('../models/Products')

module.exports = class ProductController {
    static async addType(req, res) {
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

    static async retrieve(req, res) {
        res.json('Olá CrowStore');
    }
}
