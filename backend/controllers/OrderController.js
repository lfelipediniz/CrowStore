const OrderModel = require('../models/Order');
const mongoose = require('../db/conn');

class OrController {
    static async registerOrder(req, res) {
        const { Products, Quantities, TotalPrice, adress, cep, cpf, clientName, phone } = req.body;
        let newOrder;


        newOrder = new OrderModel({
            Products,
            Quantities,
            TotalPrice,
            adress,
            cep,
            cpf,
            clientName,
            phone,
        });

        try {

            await newOrder.save();
            res.status(200).json({ message: 'Order registered successfully' });
        } catch (error) {
            res.status(500).json({ message: "Ordem falhou ao ser registrada" });
        }
    }
}

module.exports = OrController;
