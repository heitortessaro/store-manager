const connection = require('./connection');

const create = async ({ name }) => {
  try {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
    );
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    const [rows] = await connection.execute(
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
    if (!result) return false;
    // console.log(result);
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
