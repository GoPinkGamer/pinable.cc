/**
 * PinableLab App
 * 主应用控制器 - 支持视频和游戏双产品展示
 * 支持中英文多语言
 */

// 视频配置数据
const VIDEOS_CONFIG = [
  {
    id: 'video_1',
    title: '产品演示视频',
    titleEn: 'Product Demo Video',
    description: '使用 PinableVideo 创建的产品演示，展示 AI 辅助视频制作的强大功能。',
    descriptionEn: 'Product demo created with PinableVideo, showcasing the power of AI-assisted video production.',
    thumbnail: null, // 使用生成的占位图
    duration: '2:30',
    tags: ['产品演示', 'AI生成'],
    featured: true,
    url: '#'
  },
  {
    id: 'video_2',
    title: '教程：快速上手',
    titleEn: 'Tutorial: Quick Start',
    description: '5分钟学会使用 PinableVideo 创建你的第一个视频项目。',
    descriptionEn: 'Learn to create your first video project with PinableVideo in 5 minutes.',
    thumbnail: null,
    duration: '5:00',
    tags: ['教程', '入门'],
    featured: false,
    url: '#'
  },
  {
    id: 'video_3',
    title: '创意短片示例',
    titleEn: 'Creative Short Film Example',
    description: 'AI 辅助创作的创意短片，展示无限创意可能。',
    descriptionEn: 'AI-assisted creative short film, showcasing unlimited creative possibilities.',
    thumbnail: null,
    duration: '1:45',
    tags: ['创意', '短片'],
    featured: false,
    url: '#'
  }
];

// Hero 内容配置
const HERO_CONTENT = {
  video: {
    main: 'PinableVideo',
    sub: 'hero.video.sub',
    description: 'hero.video.description',
    statLabel: 'hero.video.stat'
  },
  game: {
    main: 'PinableGame',
    sub: 'hero.game.sub',
    description: 'hero.game.description',
    statLabel: 'hero.game.stat'
  }
};

class App {
  constructor() {
    this.gameLoader = new GameLoader();
    this.searchEngine = new SearchEngine(GAMES_CONFIG);
    this.currentProduct = 'game'; // 默认显示游戏
    this.allTags = getAllTags();

    // DOM 元素引用
    this.gameGrid = null;
    this.videoGrid = null;
    this.searchInput = null;
    this.tagFilters = null;
    this.siteHeader = null;
    this.productNavTabs = null;
    this.heroSection = null;
    this.videoSection = null;
    this.gameSection = null;
    this.langSwitcher = null;
    this.langToggle = null;
    this.langDropdown = null;
  }

  /**
   * 初始化应用
   */
  init() {
    // 初始化多语言
    I18N.init();

    this.gameLoader.init();
    this.setupDOM();
    this.renderTagFilters();
    this.renderGames(GAMES_CONFIG);
    this.renderVideos(VIDEOS_CONFIG);
    this.bindEvents();
    this.initLucideIcons();
    this.initHeaderScroll();
    this.initLanguageSwitcher();
    this.updateHeroContent();
    this.updateStats();
    this.translatePage();

    console.log('🔬 PinableLab initialized!');
  }

  /**
   * 设置DOM引用
   */
  setupDOM() {
    this.gameGrid = document.getElementById('game-grid');
    this.videoGrid = document.getElementById('video-grid');
    this.searchInput = document.getElementById('search-input');
    this.tagFilters = document.getElementById('tag-filters');
    this.siteHeader = document.getElementById('site-header');
    this.productNavTabs = document.querySelectorAll('.nav-tab');
    this.heroSection = document.getElementById('hero-section');
    this.videoSection = document.getElementById('video-section');
    this.gameSection = document.getElementById('game-section');
    this.langSwitcher = document.getElementById('lang-switcher');
    this.langToggle = document.getElementById('lang-toggle');
    this.langDropdown = document.getElementById('lang-dropdown');
  }

  /**
   * 初始化语言切换器
   */
  initLanguageSwitcher() {
    if (!this.langToggle || !this.langSwitcher) return;

    // 更新当前语言显示
    this.updateLangDisplay();

    // 切换下拉菜单
    this.langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.langSwitcher.classList.toggle('open');
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
      if (!this.langSwitcher.contains(e.target)) {
        this.langSwitcher.classList.remove('open');
      }
    });

    // 语言选项点击
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.dataset.lang;
        this.switchLanguage(lang);
        this.langSwitcher.classList.remove('open');
      });
    });

    // 监听语言变化事件
    window.addEventListener('langchange', () => {
      this.onLanguageChange();
    });
  }

  /**
   * 切换语言
   */
  switchLanguage(lang) {
    if (I18N.setLang(lang)) {
      this.updateLangDisplay();
    }
  }

  /**
   * 更新语言显示
   */
  updateLangDisplay() {
    const currentLang = I18N.getLang();
    const langInfo = I18N.getSupportedLangs()[currentLang];
    const currentLangName = document.getElementById('current-lang-name');

    if (currentLangName && langInfo) {
      currentLangName.textContent = langInfo.name;
    }

    // 更新选项激活状态
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
      option.classList.toggle('active', option.dataset.lang === currentLang);
    });
  }

  /**
   * 语言变化回调
   */
  onLanguageChange() {
    this.translatePage();
    this.updateHeroContent();
    this.renderTagFilters();
    this.renderGames(GAMES_CONFIG);
    this.renderVideos(VIDEOS_CONFIG);
    this.initLucideIcons();
  }

  /**
   * 翻译页面
   */
  translatePage() {
    // 翻译带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    // 翻译 placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    // 翻译 aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });

    // 更新页面标题
    document.title = t('meta.title');
  }

  /**
   * 初始化 Header 滚动效果
   */
  initHeaderScroll() {
    if (!this.siteHeader) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        this.siteHeader.classList.add('scrolled');
      } else {
        this.siteHeader.classList.remove('scrolled');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * 切换产品视图
   */
  switchProduct(product) {
    if (this.currentProduct === product) return;

    this.currentProduct = product;

    // 更新导航选中状态
    this.productNavTabs.forEach(tab => {
      const isActive = tab.dataset.product === product;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive);
    });

    // 切换内容区域显示
    if (this.videoSection && this.gameSection) {
      if (product === 'video') {
        this.videoSection.classList.add('active');
        this.gameSection.classList.remove('active');
      } else {
        this.videoSection.classList.remove('active');
        this.gameSection.classList.add('active');
      }
    }

    // 更新 Hero 内容
    this.updateHeroContent();

    // 更新标签筛选
    this.renderTagFilters();

    // 更新统计数据
    this.updateStats();

    // 更新 Hero 背景色
    this.updateHeroBackground();
  }

  /**
   * 更新 Hero 背景色
   */
  updateHeroBackground() {
    if (!this.heroSection) return;

    if (this.currentProduct === 'video') {
      this.heroSection.style.background = 'var(--block-rose)';
    } else {
      this.heroSection.style.background = 'var(--block-purple)';
    }
  }

  /**
   * 更新 Hero 区域内容
   */
  updateHeroContent() {
    const content = HERO_CONTENT[this.currentProduct];

    const mainTitle = document.getElementById('hero-main-title');
    const subTitle = document.getElementById('hero-sub-title');
    const description = document.getElementById('hero-description');
    const statLabel = document.getElementById('stat-label');

    if (mainTitle) mainTitle.textContent = content.main;
    if (subTitle) subTitle.textContent = t(content.sub);
    if (description) description.textContent = t(content.description);
    if (statLabel) statLabel.textContent = t(content.statLabel);
  }

  /**
   * 更新统计数据
   */
  updateStats() {
    const statCount = document.getElementById('stat-count');
    if (statCount) {
      const count = this.currentProduct === 'video'
        ? VIDEOS_CONFIG.length
        : GAMES_CONFIG.length;
      statCount.textContent = count;
    }
  }

  /**
   * 渲染标签筛选按钮
   */
  renderTagFilters() {
    if (!this.tagFilters) return;

    const tags = this.currentProduct === 'video'
      ? this.getVideoTags()
      : this.allTags;

    this.tagFilters.innerHTML = tags.map(tag => `
      <button class="tag-filter" data-tag="${tag}">
        ${I18N.translateTag(tag)}
      </button>
    `).join('');
  }

  /**
   * 获取视频标签
   */
  getVideoTags() {
    const tags = new Set();
    VIDEOS_CONFIG.forEach(video => {
      video.tags.forEach(tag => tags.add(tag));
    });
    return [t('filters.all'), ...Array.from(tags)];
  }

  /**
   * 渲染视频卡片
   */
  renderVideos(videos) {
    if (!this.videoGrid) return;

    this.videoGrid.innerHTML = '';

    if (videos.length === 0) {
      this.showNoResults(this.videoGrid, 'video');
      return;
    }

    videos.forEach((video, index) => {
      const card = this.createVideoCard(video, index);
      this.videoGrid.appendChild(card);
    });

    this.initLucideIcons();
  }

  /**
   * 创建视频卡片
   */
  createVideoCard(video, index) {
    const card = document.createElement('div');
    card.className = 'content-card card-animate';
    card.style.animationDelay = `${index * 0.05}s`;

    const thumbnailSrc = video.thumbnail || this.generateVideoPlaceholder(video);
    const isEn = I18N.getLang() === 'en';
    const title = isEn && video.titleEn ? video.titleEn : video.title;
    const description = isEn && video.descriptionEn ? video.descriptionEn : video.description;

    card.innerHTML = `
      <div class="card-thumbnail">
        <img src="${thumbnailSrc}" alt="${title}" loading="lazy" onerror="this.src='${this.generateVideoPlaceholder(video)}'">
        <span class="card-type-badge">
          <i data-lucide="video"></i>
          ${video.duration}
        </span>
        ${video.featured ? `<span class="card-badge">${t('card.featured')}</span>` : ''}
      </div>
      <div class="card-content">
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${description}</p>
        <div class="card-tags">
          ${video.tags.map(tag => `<span class="tag">${I18N.translateTag(tag)}</span>`).join('')}
        </div>
        <button class="btn-action" data-video-id="${video.id}" aria-label="${t('card.playAria')} ${title}">
          <i data-lucide="play"></i>
          <span>${t('card.playVideo')}</span>
        </button>
      </div>
    `;

    return card;
  }

  /**
   * 生成视频占位图
   */
  generateVideoPlaceholder(video) {
    const colors = ['#F43F5E', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'];
    const color = colors[Math.abs(video.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length];

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect fill='${encodeURIComponent(color)}' width='800' height='450'/%3E%3Ccircle cx='400' cy='225' r='60' fill='white' opacity='0.9'/%3E%3Cpolygon points='380,195 380,255 430,225' fill='${encodeURIComponent(color)}'/%3E%3C/svg%3E`;
  }

  /**
   * 渲染游戏卡片
   */
  renderGames(games) {
    if (!this.gameGrid) return;

    this.gameGrid.innerHTML = '';

    if (games.length === 0) {
      this.showNoResults(this.gameGrid, 'game');
      return;
    }

    games.forEach((game, index) => {
      const card = this.createGameCard(game, index);
      this.gameGrid.appendChild(card);
    });

    this.initLucideIcons();
  }

  /**
   * 创建游戏卡片
   */
  createGameCard(game, index) {
    const card = document.createElement('div');
    card.className = 'game-card card-animate';
    card.style.animationDelay = `${index * 0.05}s`;

    const thumbnailSrc = this.getThumbnailSrc(game);
    const difficultyLabel = t(`difficulty.${game.difficulty}`);

    card.innerHTML = `
      <div class="game-card-thumbnail">
        <img src="${thumbnailSrc}" alt="${game.title}" loading="lazy" onerror="this.src='${this.generatePlaceholder(game)}'">
        ${game.featured ? `<span class="featured-badge">${t('card.featured')}</span>` : ''}
      </div>
      <div class="game-card-content">
        <h3 class="game-card-title">${game.title}</h3>
        <p class="game-card-description">${game.description}</p>
        <div class="game-card-tags">
          ${game.tags.map(tag => `
            <span class="tag" style="background: ${TAG_COLORS[tag] || 'var(--bg-muted)'}; color: white;">
              ${I18N.translateTag(tag)}
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
            ${difficultyLabel}
          </span>
        </div>
        <button class="btn-play" data-game-id="${game.id}" aria-label="${t('card.playAria')} ${game.title}">
          <i data-lucide="play"></i>
          <span>${t('card.play')}</span>
        </button>
      </div>
    `;

    return card;
  }

  /**
   * 获取缩略图路径
   */
  getThumbnailSrc(game) {
    return game.thumbnail || this.generatePlaceholder(game);
  }

  /**
   * 生成占位图SVG
   */
  generatePlaceholder(game) {
    const colors = ['#3B82F6', '#8B5CF6', '#F43F5E', '#10B981', '#F59E0B'];
    const color = colors[Math.abs(game.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length];

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect fill='${encodeURIComponent(color)}' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='48' fill='white'%3E${encodeURIComponent(game.title)}%3C/text%3E%3C/svg%3E`;
  }

  /**
   * 显示无结果提示
   */
  showNoResults(container, type) {
    const icon = type === 'video' ? 'video-off' : 'search-x';
    const titleKey = type === 'video' ? 'noResults.video.title' : 'noResults.game.title';

    container.innerHTML = `
      <div class="no-results">
        <i data-lucide="${icon}"></i>
        <h3>${t(titleKey)}</h3>
        <p>${t('noResults.hint')}</p>
        <button class="btn-play" onclick="app.resetFilters()" style="max-width: 200px; margin: var(--spacing-lg) auto 0;">
          <i data-lucide="refresh-cw"></i>
          <span>${t('noResults.reset')}</span>
        </button>
      </div>
    `;
    this.initLucideIcons();
  }

  /**
   * 重置所有筛选
   */
  resetFilters() {
    const games = this.searchEngine.reset();

    if (this.searchInput) {
      this.searchInput.value = '';
    }

    document.querySelectorAll('.tag-filter.active').forEach(btn => {
      btn.classList.remove('active');
    });

    this.renderGames(games);
    this.renderVideos(VIDEOS_CONFIG);
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    // 产品导航切换
    this.productNavTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const product = tab.dataset.product;
        this.switchProduct(product);
      });
    });

    // 搜索输入
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (this.currentProduct === 'game') {
          const results = this.searchEngine.search(query);
          this.renderGames(results);
        } else {
          const results = VIDEOS_CONFIG.filter(video =>
            video.title.toLowerCase().includes(query) ||
            video.description.toLowerCase().includes(query) ||
            video.tags.some(tag => tag.toLowerCase().includes(query))
          );
          this.renderVideos(results);
        }
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

    // 视频卡片点击
    if (this.videoGrid) {
      this.videoGrid.addEventListener('click', (e) => {
        const playBtn = e.target.closest('.btn-action');
        if (playBtn) {
          const videoId = playBtn.dataset.videoId;
          if (videoId) {
            this.playVideo(videoId);
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

          if (this.currentProduct === 'game') {
            const results = this.searchEngine.toggleTag(tag);
            this.renderGames(results);
          } else {
            this.filterVideos();
          }
        }
      });
    }

    // 页脚产品导航链接
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const product = link.dataset.nav;
        this.switchProduct(product);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (this.searchInput) {
          this.searchInput.focus();
        }
      }
    });
  }

  /**
   * 筛选视频
   */
  filterVideos() {
    const activeTags = Array.from(document.querySelectorAll('.tag-filter.active'))
      .map(btn => btn.dataset.tag);

    const allLabel = t('filters.all');
    if (activeTags.length === 0 || activeTags.includes(allLabel) || activeTags.includes('全部')) {
      this.renderVideos(VIDEOS_CONFIG);
      return;
    }

    const filtered = VIDEOS_CONFIG.filter(video =>
      video.tags.some(tag => activeTags.includes(tag))
    );

    this.renderVideos(filtered);
  }

  /**
   * 播放视频
   */
  playVideo(videoId) {
    const video = VIDEOS_CONFIG.find(v => v.id === videoId);
    if (!video) return;

    const isEn = I18N.getLang() === 'en';
    const title = isEn && video.titleEn ? video.titleEn : video.title;

    // 这里可以实现视频播放逻辑
    // 例如打开模态窗口播放视频
    console.log('播放视频:', title);
    alert(`${t('video.playing')}: ${title}\n\n${t('video.devNote')}`);
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
   * 显示统计信息
   */
  showStatistics() {
    const stats = {
      videos: VIDEOS_CONFIG.length,
      games: GAMES_CONFIG.length,
      totalContent: VIDEOS_CONFIG.length + GAMES_CONFIG.length
    };
    console.table(stats);

    if (this.searchEngine) {
      const gameStats = this.searchEngine.getStatistics();
      console.log('游戏统计:', gameStats);
    }
  }
}

// 全局应用实例
let app;

// DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  app.init();
});

// 导出到全局
if (typeof window !== 'undefined') {
  window.app = app;
}
