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
  // it returns nothing if all happen as expected
};

const getAll = async () => {
  const [rows] = await connection.execute(
    `SELECT sp.sale_id AS saleId, 
      sp.product_id AS productId, 
      sp.quantity AS quantity, 
      s.date AS date 
      FROM StoreManager.sales_products AS sp 
      INNER JOIN StoreManager.sales AS s 
      ON sp.sale_id = s.id 
      ORDER BY saleId, productId; `,
  );
  if (!rows) createException(500, 'DB Error');
  return rows;
};

module.exports = {
  createSale,
  createSaleProduct,
  getAll,
};
