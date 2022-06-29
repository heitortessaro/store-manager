const productModel = require('../models/productModel');

const getAll = async () => {
  const result = await productModel.getAll();
  if (!result) return false;
  return result;
};

module.exports = {
  getAll,
};