const Product = require('../models/Products')

module.exports = class ProductContoller {
    static async retrieve(req, res) {
        res.json('Olá CrowStore')
    }
}
