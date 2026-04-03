const express = require('express')
const router = express.Router()
const controller = require('../controllers/productController')

// GET /api/products - 获取所有产品
router.get('/', controller.getProducts)

// GET /api/products/search/:keyword - 搜索产品
router.get('/search/:keyword', controller.searchProducts)

// GET /api/products/:id - 获取单个产品
router.get('/:id', controller.getProduct)

// POST /api/products - 创建产品
router.post('/', controller.createProduct)

// POST /api/products/batch - 批量创建产品
router.post('/batch', controller.createProducts)

// PUT /api/products/:id - 更新产品
router.put('/:id', controller.updateProduct)

// DELETE /api/products/:id - 删除产品
router.delete('/:id', controller.deleteProduct)

// DELETE /api/products - 批量删除产品
router.delete('/', controller.deleteProducts)

// POST /api/products/:id/sold - 标记产品已售出
router.post('/:id/sold', controller.markAsSold)

module.exports = router
