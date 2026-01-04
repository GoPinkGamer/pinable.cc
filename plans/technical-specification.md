# GitHub Pages 技术实现规范

## 文件组织结构

```
pinable.cc/
├── index.html                          # 主页入口
├── assets/
│   ├── css/
│   │   ├── variables.css              # CSS 变量定义
│   │   ├── reset.css                  # 样式重置
│   │   ├── components.css             # 组件样式
│   │   ├── layout.css                 # 布局样式
│   │   └── animations.css             # 动画效果
│   ├── js/
│   │   ├── config.js                  # 游戏配置
│   │   ├── game-loader.js             # 游戏加载器
│   │   ├── search.js                  # 搜索功能
│   │   └── main.js                    # 主应用逻辑
│   └── images/
│       ├── logo.svg                   # 网站 Logo
│       └── game-thumbnails/           # 游戏缩略图
├── .chatgame/
│   └── design_iterations/             # 游戏原型目录
│       ├── bubble_shooter_1.html
│       ├── frog_travel_game_1.html
│       └── *.css
├── CNAME                              # 域名配置
├── ads.txt                            # 广告配置
└── README.md                          # 项目文档
```

## 核心组件规范

### 1. 游戏配置系统 (config.js)

```javascript
/**
 * 游戏配置对象
 * 每个游戏的元数据定义
 */
const GAMES_CONFIG = [
  {
    id: 'bubble-shooter',
    filename: 'bubble_shooter_1.html',
    title: '🎯 泡泡龙',
    description: '经典泡泡射击游戏，消除相同颜色的泡泡，挑战高分！',
    longDescription: '这是一款经典的泡泡射击游戏。通过瞄准和发射泡泡，消除三个或更多相同颜色的泡泡。游戏包含多个关卡，难度逐渐增加。',
    tags: ['休闲', '益智', '射击', '经典'],
    theme: 'bubble_theme.css',
    thumbnail: 'assets/images/game-thumbnails/bubble-shooter.png',
    featured: true,
    difficulty: 'easy',
    players: '单人',
    controls: '鼠标点击',
    addedDate: '2026-01-04'
  },
  {
    id: 'frog-travel',
    filename: 'frog_travel_game_1.html',
    title: '🐸 小青蛙旅行',
    description: '帮助小青蛙跳跃收集花朵，探索美丽的世界！',
    longDescription: '在这个可爱的平台游戏中，控制小青蛙在荷叶间跳跃，收集花朵获得分数。注意时间限制和生命值，尽可能获得高分！',
    tags: ['冒险', '平台', '休闲', '可爱'],
    theme: 'frog_game_theme.css',
    thumbnail: 'assets/images/game-thumbnails/frog-travel.png',
    featured: true,
    difficulty: 'medium',
    players: '单人',
    controls: '键盘/触摸',
    addedDate: '2026-01-04'
  }
];

/**
 * 标签颜色映射
 */
const TAG_COLORS = {
  '休闲': '#4ade80',
  '益智': '#60a5fa',
  '射击': '#f87171',
  '冒险': '#fbbf24',
  '平台': '#a78bfa',
  '经典': '#ec4899',
  '可爱': '#fb923c'
};

/**
 * 难度等级配置
 */
const DIFFICULTY_CONFIG = {
  'easy': { label: '简单', color: '#4ade80', icon: '⭐' },
  'medium': { label: '中等', color: '#fbbf24', icon: '⭐⭐' },
  'hard': { label: '困难', color: '#f87171', icon: '⭐⭐⭐' }
};
```

### 2. 游戏加载器 (game-loader.js)

```javascript
/**
 * GameLoader 类
 * 负责加载和管理游戏
 */
class GameLoader {
  constructor() {
    this.games = GAMES_CONFIG;
    this.currentGame = null;
    this.modal = null;
    this.iframe = null;
  }

  /**
   * 初始化加载器
   */
  init() {
    this.createModal();
    this.bindEvents();
  }

  /**
   * 创建模态窗口
   */
  createModal() {
    // 创建模态窗口 DOM 结构
    // 包含 iframe 容器、关闭按钮、游戏信息等
  }

  /**
   * 加载游戏
   * @param {string} gameId - 游戏 ID
   */
  loadGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (!game) return;

    this.currentGame = game;
    this.showModal();
    this.loadGameInIframe(game.filename);
  }

  /**
   * 在 iframe 中加载游戏
   * @param {string} filename - 游戏文件名
   */
  loadGameInIframe(filename) {
    const path = `.chatgame/design_iterations/${filename}`;
    this.iframe.src = path;
  }

  /**
   * 显示模态窗口
   */
  showModal() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * 隐藏模态窗口
   */
  hideModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    this.iframe.src = '';
    this.currentGame = null;
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentGame) {
        this.hideModal();
      }
    });
  }
}
```

### 3. 搜索功能 (search.js)

```javascript
/**
 * SearchEngine 类
 * 实现游戏搜索和筛选
 */
class SearchEngine {
  constructor(games) {
    this.games = games;
    this.filteredGames = games;
    this.searchTerm = '';
    this.selectedTags = new Set();
  }

  /**
   * 执行搜索
   * @param {string} term - 搜索词
   * @returns {Array} 搜索结果
   */
  search(term) {
    this.searchTerm = term.toLowerCase();
    return this.applyFilters();
  }

  /**
   * 按标签筛选
   * @param {string} tag - 标签名
   */
  toggleTag(tag) {
    if (this.selectedTags.has(tag)) {
      this.selectedTags.delete(tag);
    } else {
      this.selectedTags.add(tag);
    }
    return this.applyFilters();
  }

  /**
   * 应用所有筛选条件
   * @returns {Array} 筛选后的游戏列表
   */
  applyFilters() {
    let results = this.games;

    // 搜索词筛选
    if (this.searchTerm) {
      results = results.filter(game => 
        game.title.toLowerCase().includes(this.searchTerm) ||
        game.description.toLowerCase().includes(this.searchTerm) ||
        game.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
      );
    }

    // 标签筛选
    if (this.selectedTags.size > 0) {
      results = results.filter(game =>
        game.tags.some(tag => this.selectedTags.has(tag))
      );
    }

    this.filteredGames = results;
    return results;
  }

  /**
   * 重置所有筛选
   */
  reset() {
    this.searchTerm = '';
    this.selectedTags.clear();
    this.filteredGames = this.games;
    return this.games;
  }
}
```

### 4. 主应用逻辑 (main.js)

```javascript
/**
 * App 类
 * 主应用控制器
 */
class App {
  constructor() {
    this.gameLoader = new GameLoader();
    this.searchEngine = new SearchEngine(GAMES_CONFIG);
    this.gameGrid = null;
  }

  /**
   * 初始化应用
   */
  init() {
    this.gameLoader.init();
    this.setupDOM();
    this.bindEvents();
    this.renderGames(GAMES_CONFIG);
    this.initLucideIcons();
  }

  /**
   * 设置 DOM 引用
   */
  setupDOM() {
    this.gameGrid = document.getElementById('game-grid');
    this.searchInput = document.getElementById('search-input');
    this.tagFilters = document.getElementById('tag-filters');
  }

  /**
   * 渲染游戏卡片
   * @param {Array} games - 游戏列表
   */
  renderGames(games) {
    this.gameGrid.innerHTML = '';

    if (games.length === 0) {
      this.showNoResults();
      return;
    }

    games.forEach((game, index) => {
      const card = this.createGameCard(game, index);
      this.gameGrid.appendChild(card);
    });
  }

  /**
   * 创建游戏卡片
   * @param {Object} game - 游戏对象
   * @param {number} index - 索引
   * @returns {HTMLElement} 卡片元素
   */
  createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
      <div class="game-card-thumbnail">
        <img src="${game.thumbnail}" alt="${game.title}" loading="lazy">
        ${game.featured ? '<span class="featured-badge">精选</span>' : ''}
      </div>
      <div class="game-card-content">
        <h3 class="game-card-title">${game.title}</h3>
        <p class="game-card-description">${game.description}</p>
        <div class="game-card-tags">
          ${game.tags.map(tag => `
            <span class="tag" style="background: ${TAG_COLORS[tag] || '#64748b'}">
              ${tag}
            </span>
          `).join('')}
        </div>
        <div class="game-card-meta">
          <span class="meta-item">
            <i data-lucide="users"></i>
            ${game.players}
          </span>
          <span class="meta-item">
            <i data-lucide="gamepad-2"></i>
            ${game.controls}
          </span>
          <span class="meta-item difficulty-${game.difficulty}">
            ${DIFFICULTY_CONFIG[game.difficulty].icon}
            ${DIFFICULTY_CONFIG[game.difficulty].label}
          </span>
        </div>
        <button class="btn-play" data-game-id="${game.id}">
          <i data-lucide="play"></i>
          <span>开始游戏</span>
        </button>
      </div>
    `;

    return card;
  }

  /**
   * 显示无结果提示
   */
  showNoResults() {
    this.gameGrid.innerHTML = `
      <div class="no-results">
        <i data-lucide="search-x"></i>
        <h3>未找到游戏</h3>
        <p>尝试使用其他关键词或清除筛选条件</p>
      </div>
    `;
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    // 搜索输入
    this.searchInput.addEventListener('input', (e) => {
      const results = this.searchEngine.search(e.target.value);
      this.renderGames(results);
      this.initLucideIcons();
    });

    // 游戏卡片点击
    this.gameGrid.addEventListener('click', (e) => {
      const playBtn = e.target.closest('.btn-play');
      if (playBtn) {
        const gameId = playBtn.dataset.gameId;
        this.gameLoader.loadGame(gameId);
      }
    });

    // 标签筛选
    this.tagFilters.addEventListener('click', (e) => {
      const tagBtn = e.target.closest('.tag-filter');
      if (tagBtn) {
        tagBtn.classList.toggle('active');
        const tag = tagBtn.dataset.tag;
        const results = this.searchEngine.toggleTag(tag);
        this.renderGames(results);
        this.initLucideIcons();
      }
    });
  }

  /**
   * 初始化 Lucide 图标
   */
  initLucideIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
}

// 应用启动
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
```

## HTML 结构规范

### 主页结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <!-- Meta 标签 -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="探索创意游戏原型集合">
  
  <!-- 外部资源 -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Outfit:wght@700&display=swap" rel="stylesheet">
  
  <!-- 样式表 -->
  <link rel="stylesheet" href="assets/css/variables.css">
  <link rel="stylesheet" href="assets/css/reset.css">
  <link rel="stylesheet" href="assets/css/components.css">
  <link rel="stylesheet" href="assets/css/layout.css">
  <link rel="stylesheet" href="assets/css/animations.css">
  
  <title>Pinable Game Prototypes - 创意游戏原型展示</title>
</head>
<body>
  <!-- 广告横幅 -->
  <div class="ad-banner">
    <!-- Google AdSense 代码 -->
  </div>

  <!-- 主容器 -->
  <div class="container">
    <!-- Hero 区域 -->
    <header class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">🎮 Pinable</span>
          <span class="subtitle">Game Prototypes</span>
        </h1>
        <p class="hero-description">探索创意游戏原型集合</p>
        
        <!-- 搜索框 -->
        <div class="search-box">
          <i data-lucide="search"></i>
          <input 
            type="text" 
            id="search-input" 
            placeholder="搜索游戏..."
            autocomplete="off"
          >
        </div>
      </div>
      
      <!-- 粒子背景 -->
      <div class="particles"></div>
    </header>

    <!-- 标签筛选 -->
    <section class="filters">
      <div class="filter-group" id="tag-filters">
        <!-- 动态生成标签按钮 -->
      </div>
    </section>

    <!-- 游戏网格 -->
    <main class="game-grid" id="game-grid">
      <!-- 动态生成游戏卡片 -->
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <p>&copy; 2026 Pinable. All rights reserved.</p>
      <div class="footer-links">
        <a href="https://github.com/yourusername/pinable.cc">GitHub</a>
      </div>
    </footer>
  </div>

  <!-- 游戏模态窗口 -->
  <div class="game-modal" id="game-modal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <div class="modal-header">
        <button class="btn-back" id="btn-back">
          <i data-lucide="arrow-left"></i>
          <span>返回</span>
        </button>
        <button class="btn-close" id="btn-close">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="modal-body">
        <iframe id="game-iframe" frameborder="0"></iframe>
      </div>
    </div>
  </div>

  <!-- 脚本 -->
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
  <script src="assets/js/config.js"></script>
  <script src="assets/js/game-loader.js"></script>
  <script src="assets/js/search.js"></script>
  <script src="assets/js/main.js"></script>
</body>
</html>
```

## CSS 架构规范

### 变量系统 (variables.css)

```css
:root {
  /* 颜色系统 */
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --color-accent: #f5576c;
  --color-success: #4ade80;
  --color-warning: #fbbf24;
  --color-danger: #f87171;
  
  /* 背景色 */
  --bg-primary: #0f0f23;
  --bg-secondary: #1a1a2e;
  --bg-card: rgba(255, 255, 255, 0.05);
  --bg-card-hover: rgba(255, 255, 255, 0.08);
  
  /* 文字色 */
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.5);
  
  /* 渐变 */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-success: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  
  /* 间距 */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  
  /* 圆角 */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  
  /* 阴影 */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.25);
  --shadow-glow: 0 0 20px rgba(102, 126, 234, 0.3);
  
  /* 动画 */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* 字体 */
  --font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Outfit', 'Poppins', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Z-index */
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal: 400;
  --z-tooltip: 500;
}
```

## 性能优化清单

### 1. 资源加载优化
- ✅ 使用 `preconnect` 预连接字体服务
- ✅ 图片懒加载 (`loading="lazy"`)
- ✅ 使用 WebP 格式图片
- ✅ CSS/JS 文件压缩

### 2. 渲染优化
- ✅ 使用 CSS `transform` 和 `opacity` 做动画
- ✅ 避免强制同步布局
- ✅ 使用 `will-change` 提示浏览器
- ✅ 虚拟滚动（如果游戏数量很多）

### 3. 缓存策略
- ✅ 设置合适的 Cache-Control 头
- ✅ 使用 Service Worker 缓存静态资源
- ✅ 版本化资源文件名

## 测试清单

### 功能测试
- [ ] 游戏列表正确加载
- [ ] 搜索功能正常工作
- [ ] 标签筛选正常工作
- [ ] 游戏模态窗口正常打开/关闭
- [ ] 游戏在 iframe 中正常运行
- [ ] ESC 键关闭模态窗口
- [ ] 广告正常显示

### 响应式测试
- [ ] 移动设备（320px - 640px）
- [ ] 平板设备（641px - 1024px）
- [ ] 桌面设备（1025px+）
- [ ] 横屏/竖屏切换

### 浏览器兼容性测试
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] 移动浏览器

### 性能测试
- [ ] Lighthouse 评分 > 90
- [ ] 首次内容绘制 < 1.5s
- [ ] 最大内容绘制 < 2.5s
- [ ] 累积布局偏移 < 0.1

## 部署检查清单

- [ ] CNAME 文件配置正确
- [ ] ads.txt 文件存在
- [ ] 所有资源路径正确
- [ ] Meta 标签完整
- [ ] 图标和 favicon 设置
- [ ] robots.txt 配置
- [ ] sitemap.xml 生成
- [ ] Google Analytics 集成（可选）
- [ ] 错误页面（404.html）

## 维护指南

### 添加新游戏
1. 将游戏 HTML 文件放入 `.chatgame/design_iterations/`
2. 在 `config.js` 中添加游戏配置
3. 准备游戏缩略图（推荐 800x600px）
4. 测试游戏在 iframe 中的运行

### 更新样式
1. 修改 CSS 变量而非硬编码值
2. 保持组件样式的独立性
3. 测试响应式布局
4. 验证浏览器兼容性

### 性能监控
1. 定期运行 Lighthouse 测试
2. 监控页面加载时间
3. 检查资源大小
4. 优化图片和代码

---

**文档版本：** 1.0  
**最后更新：** 2026-01-04  
**维护者：** Kilo Code