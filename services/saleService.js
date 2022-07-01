const httpStatusCodes = require('../helpers/httpsStatus');
const productModel = require('../models/productModel');
const saleModel = require('../models/saleModel');
const createException = require('../helpers/createException');

const isSaleDataValid = (productList) => {
  productList.forEach((p) => {
    if (!p.productId) {
      createException(httpStatusCodes.BAD_REQUEST, '"productId" is required');
    }
    if (typeof p.quantity !== 'number') {
      createException(httpStatusCodes.BAD_REQUEST, '"quantity" is required');
    }
    if (p.quantity <= 0) {
      createException(
        httpStatusCodes.SEMANTIC_ERROR,
        '"quantity" must be greater than or equal to 1',
      ); 
    }
  });
};

const allProductsExistInDB = (productList, productsInDB) => {
  productList.forEach((product) => {
    if (!productsInDB.some((pDB) => pDB.id === product.productId)) {
      createException(httpStatusCodes.NOT_FOUND, 'Product not found');
    }
  });
};

const createSale = async (productList) => {
  isSaleDataValid(productList);
  const productsInDB = await productModel.getAll();
  allProductsExistInDB(productList, productsInDB);
  const { id } = await saleModel.createSale();
  const result = { id, itemsSold: [] };
  const queryPromises = productList.map((p) =>
    saleModel.createSaleProduct({ saleId: id, productId: p.productId, quantity: p.quantity }));
  await Promise.all(queryPromises);
  productList.forEach((p) => {
    result.itemsSold = [
      ...result.itemsSold,
      { productId: p.productId, quantity: p.quantity },
    ];
  });
  return result;
};

const getAll = async () => {
  const result = await saleModel.getAll();
  return result;
};

const checkSaleExist = (id, salesInDB) => {
  if (!salesInDB.some((sale) => sale.saleId === id)) {
    createException(httpStatusCodes.NOT_FOUND, 'Sale not found');
  }
};

const getById = async ({ id }) => {
  const salesInDB = await saleModel.getAll();
  checkSaleExist(id, salesInDB);
  const result = await saleModel.getById({ id });
  return result;
};

module.exports = {
  createSale,
  getAll,
  getById,
};
