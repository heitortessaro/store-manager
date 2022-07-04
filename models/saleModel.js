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
  console.log(result);
  if (!result) createException(500, 'DB Error');
  return true;
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

const getById = async ({ id }) => {
  const [rows] = await connection.execute(
    `SELECT sp.product_id AS productId,
      sp.quantity AS quantity,
      s.date AS date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s 
      ON sp.sale_id = s.id
      WHERE sp.sale_id = (?)
      ORDER BY productId;`, [id],
  );
  if (!rows) createException(500, 'DB Error');
  return rows;
};

const del = async ({ id }) => {
  const result = await connection.execute(
    `DELETE FROM StoreManager.sales
    WHERE id = (?);`,
    [id],
  );
  if (!result) createException(500, 'DB Error');
};

const delSaleProduct = async ({ id }) => {
  const result = await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id = (?);`,
    [id],
  );
  if (!result) createException(500, 'DB Error');
};

module.exports = {
  createSale,
  createSaleProduct,
  getAll,
  getById,
  del,
  delSaleProduct,
};
