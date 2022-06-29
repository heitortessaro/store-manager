// const express = require('express');
const router = require('express').Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAll);

module.exports = router;
