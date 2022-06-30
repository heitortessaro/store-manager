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

const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: '"name" is required' });
    }
    const product = await productService.create({ name });
    if (!product) {
      res.status(httpStatus.SEMANTIC_ERROR)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    if (!product.id) return res.status(httpStatus.INTERNAL_SERVER); 
    res.status(httpStatus.CREATED).json(product);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};