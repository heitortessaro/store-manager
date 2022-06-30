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

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productService.create({ name });
    res.status(httpStatus.CREATED).json(product);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
};