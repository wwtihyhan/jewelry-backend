const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productCode: { type: String, required: true },
  productName: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  salesperson: { type: String, required: true },
  soldAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Sale', saleSchema)
