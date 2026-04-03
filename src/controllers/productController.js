const Product = require('../models/Product')

// 获取所有产品
exports.getProducts = async (req, res) => {
  try {
    const { keyword } = req.query
    let query = { sold: false }

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { code: { $regex: keyword, $options: 'i' } }
      ]
    }

    const products = await Product.find(query).sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 根据关键词搜索产品
exports.searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params
    const products = await Product.find({
      sold: false,
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { code: { $regex: keyword, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 获取单个产品
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: '产品不存在' })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 创建产品
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: '证书号已存在' })
    }
    res.status(400).json({ error: err.message })
  }
}

// 批量创建产品
exports.createProducts = async (req, res) => {
  try {
    const products = req.body
    const results = { success: 0, failed: 0, errors: [] }

    for (const item of products) {
      try {
        const product = new Product(item)
        await product.save()
        results.success++
      } catch (err) {
        results.failed++
        results.errors.push({ item, error: err.message })
      }
    }

    res.status(201).json(results)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// 更新产品
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body
    updates.updatedAt = new Date()

    const product = await Product.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )

    if (!product) {
      return res.status(404).json({ error: '产品不存在' })
    }

    res.json(product)
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: '证书号已存在' })
    }
    res.status(400).json({ error: err.message })
  }
}

// 删除产品
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ error: '产品不存在' })
    }
    res.json({ message: '删除成功' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 批量删除产品
exports.deleteProducts = async (req, res) => {
  try {
    const { ids } = req.body
    const result = await Product.deleteMany({ _id: { $in: ids } })
    res.json({ deletedCount: result.deletedCount })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// 标记产品已售出
exports.markAsSold = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { sold: true, soldAt: new Date() },
      { new: true }
    )
    if (!product) {
      return res.status(404).json({ error: '产品不存在' })
    }
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
