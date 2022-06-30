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
  if (!name || typeof name !== 'string' || name.length < 5) return false;
  return true;
};

const create = async ({ name }) => {
  const isProductValid = isNewProductValid(name);
  if (!isProductValid) return false;
  const newProduct = await productModel.create({ name });
  if (!newProduct) return { id: false };
  return newProduct;
};

module.exports = {
  getAll,
  getById,
  create,
};