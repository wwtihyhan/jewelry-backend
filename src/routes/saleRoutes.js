const express = require('express')
const router = express.Router()
const controller = require('../controllers/saleController')

// GET /api/sales - 获取所有销售记录
router.get('/', controller.getSales)

// GET /api/sales/stats - 获取销售统计
router.get('/stats', controller.getStats)

// GET /api/sales/search/:keyword - 搜索销售记录
router.get('/search/:keyword', controller.searchSales)

// POST /api/sales - 创建销售记录
router.post('/', controller.createSale)

// DELETE /api/sales/:id - 删除销售记录
router.delete('/:id', controller.deleteSale)

module.exports = router
