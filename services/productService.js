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
    throw new Error({
      status: httpStatusCodes.BAD_REQUEST,
      message: { message: '"name" is required' },
    }); 
  }
  if (name.length < 5) {
    throw new Error({
      status: httpStatusCodes.SEMANTIC_ERROR,
      message: { message: '"name" length must be at least 5 characters long' },
    }); 
  }
  return true;
};

const create = async ({ name }) => {
  isNewProductValid(name);
  const newProduct = await productModel.create({ name });
  if (!newProduct) {
    throw new Error({
      status: httpStatusCodes.INTERNAL_SERVER,
      message: { message: 'DB server error' },
    });
  }
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};