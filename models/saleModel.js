const connection = require('./connection');
const createException = require('../helpers/createException');

const createSale = async () => {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
    );
    if (!result) createException(500, 'DB Error');
    return { id: result.insertId };
};

const createSaleProduct = async ({ saleId, productId, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
  if (!result) createException(500, 'DB Error');
  return { id: result.insertId };
};

module.exports = {
  createSale,
  createSaleProduct,
};
