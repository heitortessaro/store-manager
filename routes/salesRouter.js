const router = require('express').Router();

const saleController = require('../controllers/saleController');

router.post('/', saleController.createSale);

module.exports = router;
