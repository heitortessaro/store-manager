const httpStatusCodes = require('../helpers/httpsStatus');
const productModel = require('../models/productModel');
const saleModel = require('../models/saleModel');
const createException = require('../helpers/createException');

const isSaleDataValid = (arr) => {
  arr.forEach((p) => {
    if (!p.productId) createException(httpStatusCodes.BAD_REQUEST, '"productId" is required');
    if (!p.quantity) createException(httpStatusCodes.BAD_REQUEST, '"quantity" is required');
    if (p.quantity <= 0) {
      createException(
        httpStatusCodes.SEMANTIC_ERROR,
        '"quantity" must be greater than or equal to 1',
      ); 
    }
  });
};

const allProductsExistInDB = (arr, productsInDB) => {
  arr.forEach((product) => {
    if (!productsInDB.some((pDB) => pDB.id === product.productId)) {
      createException(httpStatusCodes.NOT_FOUND, 'Product not found');
    }
  });
};

const createSale = async ({ salesArr }) => {
  isSaleDataValid(salesArr);
  const productsInDB = await productModel.getAll();
  allProductsExistInDB(salesArr, productsInDB);
  const { id } = await saleModel.createSale();
  const result = { id, itemsSold: [] };
  salesArr.forEach(async (p) => {
    await saleModel.createSaleProduct({ saleId: id, productId: p.productId, quantity: p.quantity });
    result.itemsSold = [...result.itemsSold, { productId: p.productId, quantity: p.quantity }];
  });
  return result;
};

module.exports = {
  createSale,
};
