const express = require('express')
const productControllers = require('../controller/productController.js')
const router = express.Router()

/**
 * @route GET && POST - /POST/
 */
router.route("/")
.get(productControllers.getAllProduct)
.post(productControllers.createNewProduct)

router.route('/:id')
.get(productControllers.getProductbyId)

module.exports = router