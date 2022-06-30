const httpStatusCodes = require('../helpers/httpsStatus');
const productModel = require('../models/productModel');

const getAll = async () => {
  const result = await productModel.getAll();
  if (!result) return false;
  return result;
};

const getById = async (id) => {
  const result = await productModel.getById(id);
  if (!result) return false;
  return result;
};

const isNewProductValid = (name) => {
  if (!name || typeof name !== 'string') {
    const error = new Error('"name" is required');
    error.status = httpStatusCodes.BAD_REQUEST;
    throw error;
  }
  if (name.length < 5) {
    // throw Error('erro');
    const error = new Error('"name" length must be at least 5 characters long');
    error.status = httpStatusCodes.SEMANTIC_ERROR;
    throw error;
  }
  return true;
};

const create = async ({ name }) => {
  isNewProductValid(name);
  const newProduct = await productModel.create({ name });
  if (!newProduct) {
    const error = new Error('Server error');
    error.status = httpStatusCodes.INTERNAL_SERVER;
    throw error;
  }
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};
