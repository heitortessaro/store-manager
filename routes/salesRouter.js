const router = require('express').Router();

const saleController = require('../controllers/saleController');

router.get('/', saleController.getAll);
router.post('/', saleController.createSale);
router.get('/:id', saleController.getById);

module.exports = router;
