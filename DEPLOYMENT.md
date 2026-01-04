# 部署指南

本文档提供 Pinable Game Prototypes 网站的完整部署指南。

## 📋 部署前检查清单

### 必需文件
- [x] `index.html` - 主页
- [x] `CNAME` - 域名配置
- [x] `ads.txt` - 广告配置
- [x] `assets/css/*.css` - 样式文件
- [x] `assets/js/*.js` - JavaScript 文件
- [x] `.chatgame/design_iterations/` - 游戏文件

### 可选文件
- [ ] `robots.txt` - 搜索引擎配置
- [ ] `sitemap.xml` - 网站地图
- [ ] `assets/images/` - 图片资源
- [ ] `404.html` - 错误页面

## 🚀 GitHub Pages 部署步骤

### 1. 准备仓库

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Pinable Game Prototypes"

# 添加远程仓库
git remote add origin https://github.com/yourusername/pinable.cc.git

# 推送到 GitHub
git push -u origin main
```

### 2. 启用 GitHub Pages

1. 进入 GitHub 仓库设置
2. 找到 "Pages" 部分
3. 选择 Source: `main` 分支
4. 选择根目录 `/` 
5. 点击 "Save"

### 3. 配置自定义域名

#### 在 GitHub 设置
1. 在 Pages 设置中，找到 "Custom domain"
2. 输入: `pinable.cc`
3. 勾选 "Enforce HTTPS"
4. 点击 "Save"

#### 配置 DNS 记录

在您的域名提供商处添加以下 DNS 记录：

**A 记录（用于根域名）：**
```
类型: A
主机: @
值: 185.199.108.153
TTL: 3600

类型: A
主机: @
值: 185.199.109.153
TTL: 3600

类型: A
主机: @
值: 185.199.110.153
TTL: 3600

类型: A
主机: @
值: 185.199.111.153
TTL: 3600
```

**CNAME 记录（用于 www 子域名）：**
```
类型: CNAME
主机: www
值: yourusername.github.io
TTL: 3600
```

### 4. 验证部署

等待 DNS 传播（通常 5-30 分钟），然后访问：
- https://pinable.cc
- https://www.pinable.cc

## 🔧 配置文件说明

### CNAME 文件
```
pinable.cc
```
此文件告诉 GitHub Pages 使用自定义域名。

### ads.txt 文件
```
google.com, pub-7256060087403757, DIRECT, f08c47fec0942fa0
```
此文件用于 Google AdSense 验证。

## 📝 更新网站

### 添加新游戏

1. 将游戏 HTML 文件放入 `.chatgame/design_iterations/`
2. 在 `assets/js/config.js` 中添加游戏配置：

```javascript
{
  id: 'new-game',
  filename: 'new_game.html',
  title: '🎮 新游戏',
  description: '游戏描述',
  tags: ['标签1', '标签2'],
  difficulty: 'easy',
  players: '单人',
  controls: '键盘',
  featured: false
}
```

3. 准备游戏缩略图（可选）
4. 提交并推送更改：

```bash
git add .
git commit -m "Add new game: 新游戏"
git push
```

### 更新样式

修改 `assets/css/` 目录下的相应文件，然后提交推送。

### 更新功能

修改 `assets/js/` 目录下的相应文件，然后提交推送。

## 🔍 SEO 优化

### 创建 robots.txt

在根目录创建 `robots.txt`：

```
User-agent: *
Allow: /

Sitemap: https://pinable.cc/sitemap.xml
```

### 创建 sitemap.xml

在根目录创建 `sitemap.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pinable.cc/</loc>
    <lastmod>2026-01-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Google Search Console

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加属性: `pinable.cc`
3. 验证所有权（使用 HTML 标签方法）
4. 提交 sitemap.xml

## 📊 Google Analytics（可选）

1. 创建 Google Analytics 账户
2. 获取跟踪 ID (G-XXXXXXXXXX)
3. 在 `index.html` 中取消注释 GA 代码
4. 替换跟踪 ID

## 💰 Google AdSense 配置

### 1. 申请 AdSense

1. 访问 [Google AdSense](https://www.google.com/adsense)
2. 使用您的 Google 账户登录
3. 添加网站: `pinable.cc`
4. 等待审核（通常 1-2 周）

### 2. 获取广告代码

审核通过后：
1. 登录 AdSense
2. 创建广告单元
3. 复制广告代码
4. 替换 `index.html` 中的占位符

### 3. 更新 ads.txt

确保 `ads.txt` 文件包含正确的发布商 ID。

## 🐛 故障排除

### 网站无法访问

**问题：** 访问域名显示 404

**解决方案：**
1. 检查 CNAME 文件是否存在且内容正确
2. 检查 DNS 记录是否正确配置
3. 等待 DNS 传播完成（最多 48 小时）
4. 清除浏览器缓存

### 游戏无法加载

**问题：** 点击游戏后 iframe 显示空白

**解决方案：**
1. 检查游戏文件路径是否正确
2. 检查浏览器控制台错误
3. 确认游戏文件存在于 `.chatgame/design_iterations/`
4. 检查游戏文件是否有语法错误

### 样式显示异常

**问题：** 页面样式混乱

**解决方案：**
1. 清除浏览器缓存
2. 检查 CSS 文件是否正确加载
3. 检查浏览器控制台错误
4. 验证 CSS 文件路径

### 搜索功能不工作

**问题：** 搜索框输入无反应

**解决方案：**
1. 检查浏览器控制台 JavaScript 错误
2. 确认所有 JS 文件正确加载
3. 检查 JS 文件加载顺序
4. 验证 config.js 中的游戏配置

## 📈 性能优化

### 图片优化

```bash
# 使用 ImageOptim 或类似工具压缩图片
# 转换为 WebP 格式
cwebp input.png -q 85 -o output.webp
```

### 代码压缩

```bash
# 压缩 CSS
npx cssnano assets/css/components.css assets/css/components.min.css

# 压缩 JavaScript
npx terser assets/js/main.js -o assets/js/main.min.js
```

### 启用缓存

在仓库根目录创建 `.htaccess`（如果使用 Apache）：

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

## 🔒 安全性

### HTTPS

GitHub Pages 自动提供 HTTPS，确保在设置中启用 "Enforce HTTPS"。

### 内容安全策略

在 `index.html` 的 `<head>` 中添加：

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://unpkg.com https://pagead2.googlesyndication.com; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com; 
               img-src 'self' data: https:;">
```

## 📞 支持

如有问题，请：
1. 检查本文档的故障排除部分
2. 查看 GitHub Issues
3. 联系项目维护者

## 🎉 部署完成

恭喜！您的网站现在应该已经成功部署到 https://pinable.cc

下一步：
- [ ] 测试所有功能
- [ ] 提交到 Google Search Console
- [ ] 配置 Google Analytics
- [ ] 监控网站性能
- [ ] 收集用户反馈

---

**最后更新：** 2026-01-04  
**维护者：** Kilo Code