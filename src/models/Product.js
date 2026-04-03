const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  purchasePrice: { type: Number, default: 0 },
  imageUrl: { type: String },
  serialNumber: String,
  totalWeight: Number,
  goldWeight: Number,
  silverWeight: Number,
  goldValue: Number,
  silverValue: Number,
  workFee: Number,
  totalWorkFee: Number,
  certFee: Number,
  extraFee: Number,
  sold: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

productSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

module.exports = mongoose.model('Product', productSchema)
