const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderController {
    static async registerOrder(req, res) {
        const { Items, address, cep, cpf, clientName, phone } = req.body;
        let totalPrice = 0;

        try {
            for (const item of Items) {
                const product = await Product.findById(item.productId);
                console.log(product)
                const itemPrice = product.price * item.quantity;
                totalPrice += itemPrice;
            }

            let newOrder = new Order({
                Items,
                totalPrice,
                address,
                cep,
                cpf,
                clientName,
                phone,
            });
            console.log(newOrder);

            await newOrder.save();
            res.status(200).json({ message: 'Order registered successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to register order' });
        }
    }
}

module.exports = OrderController;
