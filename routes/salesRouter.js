const router = require('express').Router();

const saleController = require('../controllers/saleController');

router.get('/:id', saleController.getById);
router.get('/', saleController.getAll);
router.post('/', saleController.createSale);
router.delete('/:id', saleController.del);

module.exports = router;
