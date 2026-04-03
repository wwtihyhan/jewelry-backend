const Sale = require('../models/Sale')
const Product = require('../models/Product')

// 获取所有销售记录
exports.getSales = async (req, res) => {
  try {
    const { keyword } = req.query
    let query = {}

    if (keyword) {
      query.$or = [
        { productName: { $regex: keyword, $options: 'i' } },
        { productCode: { $regex: keyword, $options: 'i' } },
        { salesperson: { $regex: keyword, $options: 'i' } }
      ]
    }

    const sales = await Sale.find(query).sort({ soldAt: -1 })
    res.json(sales)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 搜索销售记录
exports.searchSales = async (req, res) => {
  try {
    const { keyword } = req.params
    const sales = await Sale.find({
      $or: [
        { productName: { $regex: keyword, $options: 'i' } },
        { productCode: { $regex: keyword, $options: 'i' } },
        { salesperson: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ soldAt: -1 })
    res.json(sales)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 创建销售记录
exports.createSale = async (req, res) => {
  try {
    const { productId, productCode, productName, purchasePrice, salePrice, salesperson } = req.body

    // 创建销售记录
    const sale = new Sale({
      productId,
      productCode,
      productName,
      purchasePrice,
      salePrice,
      salesperson
    })
    await sale.save()

    // 标记产品已售出
    await Product.findByIdAndUpdate(productId, { sold: true })

    res.status(201).json(sale)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// 删除销售记录
exports.deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id)
    if (!sale) {
      return res.status(404).json({ error: '销售记录不存在' })
    }
    res.json({ message: '删除成功' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 获取销售统计
exports.getStats = async (req, res) => {
  try {
    const sales = await Sale.find()
    const totalAmount = sales.reduce((sum, s) => sum + s.salePrice, 0)
    const totalProfit = sales.reduce((sum, s) => sum + (s.salePrice - s.purchasePrice), 0)

    // 今日销售
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todaySales = sales.filter(s => new Date(s.soldAt).setHours(0, 0, 0, 0) === today.getTime())
    const todayAmount = todaySales.reduce((sum, s) => sum + s.salePrice, 0)
    const todayProfit = todaySales.reduce((sum, s) => sum + (s.salePrice - s.purchasePrice), 0)

    res.json({
      total: { amount: totalAmount, profit: totalProfit, count: sales.length },
      today: { amount: todayAmount, profit: todayProfit, count: todaySales.length }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
