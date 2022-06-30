const productService = require('../services/productService');
const httpStatus = require('../helpers/httpsStatus');

const getAll = async (_req, res) => {
  try {
    const results = await productService.getAll();
    if (!results) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Product not found' });
    }
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER)
      .json({ message: 'Error trying to finish the operation.' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productService.getById(id);
    if (!result) return res.status(httpStatus.NOT_FOUND).json({ message: 'Product not found' });
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER)
      .json({ message: 'Error trying to finish the operation.' });
  }
};

module.exports = {
  getAll,
  getById,
};