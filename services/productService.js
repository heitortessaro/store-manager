const httpStatusCodes = require('../helpers/httpsStatus');
const productModel = require('../models/productModel');
const createException = require('../helpers/createException');

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

const checkProductExist = (id, productsInDB) => {
  if (!productsInDB.some((product) => product.id === id)) {
    createException(httpStatusCodes.NOT_FOUND, 'Product not found');
  }
};

const update = async ({ id, name }) => {
  const productsInDB = await productModel.getAll();
  checkProductExist(id, productsInDB);
  const result = await productModel.update({ id, name });
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
