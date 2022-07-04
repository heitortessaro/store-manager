const connection = require('./connection');
const createException = require('../helpers/createException');

const create = async ({ name }) => {
  try {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
    );
    if (!result) return false;
    return { id: result.insertId, name };
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
    return result[0];
  } catch (error) {
    console.log(error);
  }
};

const update = async ({ id, name }) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products 
    SET name = (?)
    WHERE id = (?);`,
    [name, id],
  );
  if (!result) createException(500, 'DB Error');
  return { id, name };
};

const del = async ({ id }) => {
  const result = await connection.execute(
    `DELETE FROM StoreManager.products
    WHERE id = (?);`,
    [id],
  );
  if (!result) createException(500, 'DB Error');
  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  del,
};
