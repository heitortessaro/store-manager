const saleService = require('../services/saleService');
const httpStatus = require('../helpers/httpsStatus');

const createSale = async (req, res) => {
  try {
    const productList = req.body;
    const sale = await saleService.createSale(productList);
    res.status(httpStatus.CREATED).json(sale);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const results = await saleService.getAll();
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await saleService.getById({ id: Number(id) });
    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const del = async (req, res) => {
  try {
    const { id } = req.params;
    await saleService.del({ id: Number(id) });
    return res.status(httpStatus.OK_NOTHING_TO_RETURN).json();
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const productList = req.body;
    const saleUpdated = await saleService.update({
      id: Number(id),
      productList,
    });
    res.status(httpStatus.OK).json(saleUpdated);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAll,
  getById,
  del,
  update,
};