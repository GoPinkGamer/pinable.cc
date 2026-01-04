# 🎮 Pinable Game Prototypes

> 创意游戏原型展示平台 - 探索、体验、分享

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-success)](https://pinable.cc)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 🌟 项目简介

Pinable Game Prototypes 是一个现代化的游戏原型展示平台，用于展示和体验各种创意 HTML5 游戏原型。

**在线访问：** [https://pinable.cc](https://pinable.cc)

### ✨ 特性

- 🎨 **现代化设计** - 渐变色、玻璃态效果、流畅动画
- 🔍 **实时搜索** - 快速找到您想玩的游戏
- 🏷️ **标签筛选** - 按类型、难度筛选游戏
- 📱 **响应式设计** - 完美适配桌面、平板、手机
- ⚡ **高性能** - 优化的加载和渲染
- 🎯 **即时体验** - 点击即玩，无需下载

## 🎮 游戏列表

### 精选游戏

1. **🎯 泡泡龙** - 经典泡泡射击游戏
   - 类型：休闲、益智、射击
   - 难度：简单
   - 操作：鼠标点击

2. **🐸 小青蛙旅行** - 可爱的平台跳跃游戏
   - 类型：冒险、平台、休闲
   - 难度：中等
   - 操作：键盘/触摸

## 🚀 快速开始

### 在线访问

直接访问 [https://pinable.cc](https://pinable.cc) 即可开始游戏！

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yourusername/pinable.cc.git

# 进入目录
cd pinable.cc

# 使用任何 HTTP 服务器运行
# 方法 1: Python
python -m http.server 8000

# 方法 2: Node.js
npx http-server

# 方法 3: VS Code Live Server
# 右键 index.html -> Open with Live Server

# 访问 http://localhost:8000
```

## 📁 项目结构

```
pinable.cc/
├── index.html              # 主页
├── assets/
│   ├── css/               # 样式文件
│   │   ├── variables.css  # CSS 变量
│   │   ├── reset.css      # 样式重置
│   │   ├── components.css # 组件样式
│   │   ├── layout.css     # 布局样式
│   │   └── animations.css # 动画效果
│   ├── js/                # JavaScript 文件
│   │   ├── config.js      # 游戏配置
│   │   ├── game-loader.js # 游戏加载器
│   │   ├── search.js      # 搜索引擎
│   │   └── main.js        # 主应用
│   └── images/            # 图片资源
├── .chatgame/
│   └── design_iterations/ # 游戏原型文件
├── plans/                 # 设计文档
├── CNAME                  # 域名配置
├── ads.txt                # 广告配置
├── robots.txt             # SEO 配置
├── sitemap.xml            # 网站地图
├── DEPLOYMENT.md          # 部署指南
└── README.md              # 本文件
```

## 🛠️ 技术栈

- **前端框架：** 原生 HTML5 + CSS3 + JavaScript (ES6+)
- **图标库：** [Lucide Icons](https://lucide.dev/)
- **字体：** [Google Fonts](https://fonts.google.com/) (Poppins, Outfit)
- **广告：** Google AdSense
- **部署：** GitHub Pages
- **域名：** pinable.cc

## 📝 添加新游戏

### 1. 准备游戏文件

将您的游戏 HTML 文件放入 `.chatgame/design_iterations/` 目录。

### 2. 配置游戏信息

在 `assets/js/config.js` 中添加游戏配置：

```javascript
{
  id: 'your-game-id',
  filename: 'your_game.html',
  title: '🎮 您的游戏名称',
  description: '游戏简短描述',
  longDescription: '游戏详细描述',
  tags: ['标签1', '标签2', '标签3'],
  difficulty: 'easy', // easy, medium, hard
  players: '单人',
  controls: '键盘/鼠标',
  featured: false,
  thumbnail: 'assets/images/game-thumbnails/your-game.png'
}
```

### 3. 准备缩略图（可选）

- 尺寸：800x600px
- 格式：PNG 或 WebP
- 位置：`assets/images/game-thumbnails/`

### 4. 提交更改

```bash
git add .
git commit -m "Add new game: 您的游戏名称"
git push
```

## 🎨 自定义样式

### 修改颜色主题

编辑 `assets/css/variables.css`：

```css
:root {
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  /* 修改其他颜色变量 */
}
```

### 修改布局

编辑 `assets/css/layout.css` 中的响应式断点和网格布局。

### 添加动画

在 `assets/css/animations.css` 中添加自定义动画。

## 📊 性能优化

- ✅ 图片懒加载
- ✅ CSS/JS 按需加载
- ✅ 响应式图片
- ✅ 浏览器缓存
- ✅ 代码压缩（生产环境）

## 🔒 安全性

- ✅ HTTPS 强制启用
- ✅ 内容安全策略 (CSP)
- ✅ 跨域资源共享 (CORS) 配置
- ✅ XSS 防护

## 📈 SEO 优化

- ✅ 语义化 HTML
- ✅ Meta 标签完整
- ✅ Open Graph 标签
- ✅ Twitter Card 标签
- ✅ 结构化数据
- ✅ Sitemap.xml
- ✅ Robots.txt

## 🌐 浏览器支持

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari
- ✅ Chrome Mobile

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 联系方式

- **网站：** [https://pinable.cc](https://pinable.cc)
- **GitHub：** [https://github.com/yourusername/pinable.cc](https://github.com/yourusername/pinable.cc)
- **Issues：** [提交问题](https://github.com/yourusername/pinable.cc/issues)

## 🙏 致谢

- [Lucide Icons](https://lucide.dev/) - 精美的图标库
- [Google Fonts](https://fonts.google.com/) - 优质字体
- [GitHub Pages](https://pages.github.com/) - 免费托管服务

## 📚 相关文档

- [部署指南](DEPLOYMENT.md) - 完整的部署说明
- [设计文档](plans/github-pages-design.md) - 设计方案
- [技术规范](plans/technical-specification.md) - 技术实现细节
- [实施路线图](plans/implementation-roadmap.md) - 开发计划

---

**Made with ❤️ by Kilo Code**

⭐ 如果这个项目对您有帮助，请给它一个星标！
