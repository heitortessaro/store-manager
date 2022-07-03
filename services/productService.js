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
    createException(httpStatusCodes.BAD_REQUEST, '"name" is required');
  }
  if (name.length < 5) {
    createException(
      httpStatusCodes.SEMANTIC_ERROR,
      '"name" length must be at least 5 characters long',
    );
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
  isNewProductValid(name);
  const productsInDB = await productModel.getAll();
  checkProductExist(id, productsInDB);
  await productModel.update({ id, name });
  return { id, name };
};

const del = async ({ id }) => {
  const productsInDB = await productModel.getAll();
  checkProductExist(id, productsInDB);
  await productModel.del({ id });
  return true;
};

const searchByName = async ({ name }) => {
  const productsInDB = await productModel.getAll();
  const result = productsInDB.filter((p) => p.name.include(name));
  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
  searchByName,
};
