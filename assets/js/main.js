/**
 * App 类
 * 主应用控制器
 */
class App {
  constructor() {
    this.gameLoader = new GameLoader();
    this.searchEngine = new SearchEngine(GAMES_CONFIG);
    this.gameGrid = null;
    this.searchInput = null;
    this.tagFilters = null;
    this.allTags = getAllTags();
  }

  /**
   * 初始化应用
   */
  init() {
    this.gameLoader.init();
    this.setupDOM();
    this.renderTagFilters();
    this.renderGames(GAMES_CONFIG);
    this.bindEvents();
    this.initLucideIcons();
    
    console.log('🎮 Pinable Game Prototypes initialized!');
  }

  /**
   * 设置DOM引用
   */
  setupDOM() {
    this.gameGrid = document.getElementById('game-grid');
    this.searchInput = document.getElementById('search-input');
    this.tagFilters = document.getElementById('tag-filters');
  }

  /**
   * 渲染标签筛选按钮
   */
  renderTagFilters() {
    if (!this.tagFilters) return;

    this.tagFilters.innerHTML = this.allTags.map(tag => `
      <button class="tag-filter" data-tag="${tag}">
        ${tag}
      </button>
    `).join('');
  }

  /**
   * 渲染游戏卡片
   * @param {Array<Object>} games - 游戏列表
   */
  renderGames(games) {
    if (!this.gameGrid) return;

    this.gameGrid.innerHTML = '';

    if (games.length === 0) {
      this.showNoResults();
      return;
    }

    games.forEach((game, index) => {
      const card = this.createGameCard(game, index);
      this.gameGrid.appendChild(card);
    });

    // 重新初始化图标
    this.initLucideIcons();
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
    
    // 使用占位图或实际缩略图
    const thumbnailSrc = this.getThumbnailSrc(game);
    
    card.innerHTML = `
      <div class="game-card-thumbnail">
        <img src="${thumbnailSrc}" alt="${game.title}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22600%22%3E%3Crect fill=%22%23667eea%22 width=%22800%22 height=%22600%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2248%22 fill=%22white%22%3E${game.title}%3C/text%3E%3C/svg%3E'">
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
        <button class="btn-play" data-game-id="${game.id}" aria-label="开始玩 ${game.title}">
          <i data-lucide="play"></i>
          <span>开始游戏</span>
        </button>
      </div>
    `;

    return card;
  }

  /**
   * 获取缩略图路径
   * @param {Object} game - 游戏对象
   * @returns {string} 缩略图路径
   */
  getThumbnailSrc(game) {
    // 尝试使用配置的缩略图，如果不存在则使用占位图
    return game.thumbnail || this.generatePlaceholder(game);
  }

  /**
   * 生成占位图SVG
   * @param {Object} game - 游戏对象
   * @returns {string} SVG Data URL
   */
  generatePlaceholder(game) {
    const colors = ['#667eea', '#764ba2', '#f5576c', '#4ade80', '#fbbf24'];
    const color = colors[Math.abs(game.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length];
    
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='${encodeURIComponent(color)}' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='white'%3E${encodeURIComponent(game.title)}%3C/text%3E%3C/svg%3E`;
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
        <button class="btn-play" onclick="app.resetFilters()" style="max-width: 200px; margin: var(--spacing-lg) auto 0;">
          <i data-lucide="refresh-cw"></i>
          <span>重置筛选</span>
        </button>
      </div>
    `;
    this.initLucideIcons();
  }

  /**
   * 重置所有筛选
   */
  resetFilters() {
    // 重置搜索引擎
    const games = this.searchEngine.reset();
    
    // 清空搜索框
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    
    // 清除标签选中状态
    document.querySelectorAll('.tag-filter.active').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // 重新渲染游戏
    this.renderGames(games);
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    // 搜索输入
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const results = this.searchEngine.search(e.target.value);
        this.renderGames(results);
      });
    }

    // 游戏卡片点击
    if (this.gameGrid) {
      this.gameGrid.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.btn-play');
        if (playBtn) {
          const gameId = playBtn.dataset.gameId;
          if (gameId) {
            this.gameLoader.loadGame(gameId);
          }
        }
      });
    }

    // 标签筛选
    if (this.tagFilters) {
      this.tagFilters.addEventListener('click', (e) => {
        const tagBtn = e.target.closest('.tag-filter');
        if (tagBtn) {
          tagBtn.classList.toggle('active');
          const tag = tagBtn.dataset.tag;
          const results = this.searchEngine.toggleTag(tag);
          this.renderGames(results);
        }
      });
    }

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K 聚焦搜索框
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }
    });
  }

  /**
   * 初始化Lucide图标
   */
  initLucideIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /**
   * 显示统计信息（调试用）
   */
  showStatistics() {
    const stats = this.searchEngine.getStatistics();
    console.table(stats);
  }
}

// 全局应用实例
let app;

// DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  app.init();
});

// 导出到全局（用于调试）
if (typeof window !== 'undefined') {
  window.app = app;
}