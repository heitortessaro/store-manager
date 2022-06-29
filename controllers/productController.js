const productService = require('../services/productService');
const httpStatus = require('../helpers/httpsStatus');

const getAll = async (req, res) => {
  try {
    const results = await productService.getAll();
    if (!results) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    return res.status(httpStatus.OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER)
      .json({ message: 'Error trying to finish the operation.' });
  }
};

module.exports = {
  getAll,
};