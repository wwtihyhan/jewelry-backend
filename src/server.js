require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const productRoutes = require('./routes/productRoutes')
const saleRoutes = require('./routes/saleRoutes')

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jewelry'

// 中间件
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// 请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
  next()
})

// 路由
app.use('/api/products', productRoutes)
app.use('/api/sales', saleRoutes)

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// API 根路径
app.get('/api', (req, res) => {
  res.json({
    name: '珠宝进销存 API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      sales: '/api/sales',
      health: '/health'
    }
  })
})

// 错误处理
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: '服务器错误' })
})

// 启动服务器
async function start() {
  try {
    console.log('正在连接 MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB 连接成功')

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`服务器运行在 http://0.0.0.0:${PORT}`)
    })
  } catch (err) {
    console.error('MongoDB 连接失败:', err.message)
    process.exit(1)
  }
}

start()
