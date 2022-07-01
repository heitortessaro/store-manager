const saleService = require('../services/saleService');
const httpStatus = require('../helpers/httpsStatus');

const createSale = async (req, res) => {
  try {
    const productList = req.body;
    const sale = await saleService.createSale(productList);
    res.status(httpStatus.CREATED).json(sale);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createSale,
};