const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.query('SELECT * FROM StoreManager.products');
  return rows;
};

module.exports = {
  getAll,
};