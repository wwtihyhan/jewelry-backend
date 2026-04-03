# 部署指南

## 1. 准备工作

### 1.1 注册账号
1. 访问 [Railway.app](https://railway.app) 并注册账号（可用 GitHub 登录）
2. 注册 [MongoDB Atlas](https://www.mongodb.com/atlas/database)（免费额度足够 10 人使用）

### 1.2 创建 MongoDB Atlas 数据库
1. 登录 MongoDB Atlas
2. 点击 "Build a Database" 选择免费套餐
3. 选择任意免费区域（如 AWS 新加坡）
4. 创建用户（用户名和密码要记住）
5. 在 Network Access 中添加允许访问的 IP：`0.0.0.0/0`
6. 获取连接字符串，格式如：
   ```
   mongodb+srv://用户名:密码@cluster.mongodb.net/jewelry
   ```

## 2. 部署后端

### 2.1 上传代码到 GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend"
git remote add origin https://github.com/你的用户名/jewelry-backend.git
git push -u origin main
```

### 2.2 在 Railway 部署
1. 登录 Railway，点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择 `jewelry-backend` 仓库
4. Railway 会自动检测 Node.js 项目并部署

### 2.3 配置环境变量
在 Railway 项目的 Settings -> Variables 中添加：
```
MONGODB_URI=mongodb+srv://用户名:密码@cluster.mongodb.net/jewelry
PORT=3000
```

### 2.4 获取后端 URL
部署完成后，Railway 会提供域名，例如：
```
https://jewelry-backend.up.railway.app
```

## 3. 更新前端配置

### 3.1 修改前端 API 地址
在项目根目录创建或修改 `.env.production`：
```
VITE_API_URL=https://jewelry-backend.up.railway.app
```

### 3.2 重新构建并部署前端
前端可以部署到 Vercel、Netlify 或 Surge 等静态托管服务。

## 4. 测试

部署完成后，在 App 中应该能看到：
- 首页显示 "已连接服务器"（绿色）
- 所有数据操作会同步到后端

## 5. 常见问题

### Q: 手机上无法连接后端？
A: 检查：
1. 后端是否正常部署
2. MongoDB Atlas 的 Network Access 是否允许所有 IP
3. 手机是否连接到互联网

### Q: 如何备份数据？
A: MongoDB Atlas 提供免费的每日自动备份，也可以在 Atlas 控制台手动备份。

### Q: 10 个人同时使用够用吗？
A: 免费套餐的 MongoDB Atlas M0 适合 10 人以下的小团队使用。如果遇到性能问题，可以升级到 M2/M5 套餐。
