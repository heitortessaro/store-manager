const connection = require('./connection');

const getAll = async () => {
  try {
    const [rows] = await connection.query(
      'SELECT * FROM StoreManager.products',
    );
    if (!rows) return false;
    return rows; 
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection.execute(
      `SELECT * FROM StoreManager.products 
      WHERE id = ?`, 
      [id],
    );
    if (!result) return null;
    console.log(result);
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
};