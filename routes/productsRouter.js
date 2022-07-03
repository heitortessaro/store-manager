// const express = require('express');
const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.post('/', productController.create);
router.get('/search', productController.searchByName);
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.del);

module.exports = router;
