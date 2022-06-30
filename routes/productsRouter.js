// const express = require('express');
const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAll);
router.post('/', productController.create);
router.get('/:id', productController.getById);

module.exports = router;
