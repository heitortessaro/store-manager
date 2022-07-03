const router = require('express').Router();

const saleController = require('../controllers/saleController');

router.get('/', saleController.getAll);
router.post('/', saleController.createSale);
router.get('/:id', saleController.getById);
router.delete('/:id', saleController.del);
router.put('/:id', saleController.update);

module.exports = router;
