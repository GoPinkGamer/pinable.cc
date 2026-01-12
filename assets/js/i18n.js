/**
 * 国际化 (i18n) 多语言支持
 * 支持语言: 中文简体 (zh-CN), 英文 (en)
 */

const I18N = {
  // 当前语言
  currentLang: 'zh-CN',

  // 支持的语言列表
  supportedLangs: {
    'zh-CN': { name: '简体中文', flag: '🇨🇳' },
    'en': { name: 'English', flag: '🇺🇸' }
  },

  // 翻译文本
  translations: {
    'zh-CN': {
      // Meta & SEO
      'meta.description': 'PinableLab - AI 驱动的创意实验室。PinableVideo 自助导演视频创作，PinableGame 快速游戏原型设计。',
      'meta.title': 'PinableLab - AI 创意实验室 | 视频导演 | 游戏原型',
      'meta.og.title': 'PinableLab - AI 创意实验室',
      'meta.og.description': 'PinableVideo 自助导演 | PinableGame 游戏原型设计',

      // Header
      'header.logo.aria': 'PinableLab 首页',
      'nav.game': 'PinableGame',
      'nav.video': 'PinableVideo',
      'nav.aria': '产品导航',

      // Hero - Video
      'hero.video.main': 'PinableVideo',
      'hero.video.sub': '自助导演，创意无限',
      'hero.video.description': '用 AI 释放你的创意，几分钟内将想法变成精彩视频。无需专业技能，人人都是导演。',
      'hero.video.stat': '个视频',

      // Hero - Game
      'hero.game.main': 'PinableGame',
      'hero.game.sub': '快速原型，即刻验证',
      'hero.game.description': '使用 AI 快速创建游戏原型，从创意到可玩只需几分钟。支持多种游戏类型，一键发布。',
      'hero.game.stat': '个游戏',

      // Search
      'search.placeholder': '搜索视频或游戏... (Ctrl+K)',
      'search.aria': '搜索',

      // Stats
      'stats.works': '个作品',
      'stats.ai': 'AI',
      'stats.aiDriven': '智能驱动',
      'stats.zero': '0',
      'stats.threshold': '门槛',

      // Filters
      'filters.all': '全部',
      'filters.aria': '筛选',
      'filters.byType': '按类型筛选',

      // Content Sections
      'section.video.title': '视频作品',
      'section.video.desc': 'AI 自助导演，轻松创作专业视频',
      'section.video.aria': '视频列表',
      'section.game.title': '游戏原型',
      'section.game.desc': '快速验证创意，从想法到可玩只需几分钟',
      'section.game.aria': '游戏列表',

      // Loading
      'loading': '加载中',

      // Cards
      'card.featured': '精选',
      'card.play': '开始游戏',
      'card.playVideo': '播放视频',
      'card.playAria': '开始玩',

      // Game Meta
      'meta.players': '人数',
      'meta.controls': '操作',
      'difficulty.easy': '简单',
      'difficulty.medium': '中等',
      'difficulty.hard': '困难',

      // No Results
      'noResults.video.title': '未找到视频',
      'noResults.game.title': '未找到游戏',
      'noResults.hint': '尝试使用其他关键词或清除筛选条件',
      'noResults.reset': '重置筛选',

      // Features Section
      'features.title': '为什么选择 PinableLab',
      'features.speed.title': '极速创作',
      'features.speed.desc': 'AI 辅助创作流程，几分钟完成从创意到成品',
      'features.ai.title': '智能生成',
      'features.ai.desc': '描述你的想法，AI 自动生成专业内容',
      'features.publish.title': '一键发布',
      'features.publish.desc': '即时预览、一键部署，作品即刻上线',
      'features.integrate.title': '无缝集成',
      'features.integrate.desc': 'VSCode 插件直接使用，融入开发工作流',

      // CTA Section
      'cta.title': '准备好释放创意了吗？',
      'cta.desc': '立即下载 VSCode 插件，开启 AI 创作之旅',
      'cta.download': '免费下载',
      'cta.guide': '使用指南',

      // Footer
      'footer.brand.desc': 'AI 驱动的创意实验室，让每个人都能成为创作者。',
      'footer.products': '产品',
      'footer.resources': '资源',
      'footer.guide': '使用指南',
      'footer.stats': '统计数据',
      'footer.contentTypes': '内容类型',
      'footer.videoTypes': '视频 - 短片 / 教程 / 宣传',
      'footer.gameTypes': '游戏 - 休闲 / 益智 / 动作',
      'footer.followUs': '关注我们',
      'footer.copyright': '© 2026 PinableLab. All rights reserved.',

      // Language Switcher
      'lang.switch': '切换语言',
      'lang.current': '当前语言',

      // Video Player
      'video.playing': '即将播放',
      'video.devNote': '（视频播放功能开发中）',

      // Tags (通用标签)
      'tag.全部': '全部',

      // Tags (游戏标签)
      'tag.休闲': '休闲',
      'tag.益智': '益智',
      'tag.射击': '射击',
      'tag.冒险': '冒险',
      'tag.平台': '平台',
      'tag.经典': '经典',
      'tag.可爱': '可爱',
      'tag.动作': '动作',
      'tag.策略': '策略',
      'tag.竞速': '竞速',

      // Video Tags
      'tag.产品演示': '产品演示',
      'tag.AI生成': 'AI生成',
      'tag.教程': '教程',
      'tag.入门': '入门',
      'tag.创意': '创意',
      'tag.短片': '短片'
    },

    'en': {
      // Meta & SEO
      'meta.description': 'PinableLab - AI-powered creative lab. PinableVideo for self-directed video creation, PinableGame for rapid game prototyping.',
      'meta.title': 'PinableLab - AI Creative Lab | Video Director | Game Prototypes',
      'meta.og.title': 'PinableLab - AI Creative Lab',
      'meta.og.description': 'PinableVideo Self-Director | PinableGame Prototype Design',

      // Header
      'header.logo.aria': 'PinableLab Home',
      'nav.game': 'PinableGame',
      'nav.video': 'PinableVideo',
      'nav.aria': 'Product Navigation',

      // Hero - Video
      'hero.video.main': 'PinableVideo',
      'hero.video.sub': 'Self-Direct, Unlimited Creativity',
      'hero.video.description': 'Unleash your creativity with AI, turn ideas into amazing videos in minutes. No professional skills needed, everyone can be a director.',
      'hero.video.stat': 'videos',

      // Hero - Game
      'hero.game.main': 'PinableGame',
      'hero.game.sub': 'Rapid Prototypes, Instant Validation',
      'hero.game.description': 'Create game prototypes quickly with AI, from idea to playable in minutes. Supports multiple game types, one-click publishing.',
      'hero.game.stat': 'games',

      // Search
      'search.placeholder': 'Search videos or games... (Ctrl+K)',
      'search.aria': 'Search',

      // Stats
      'stats.works': 'works',
      'stats.ai': 'AI',
      'stats.aiDriven': 'Powered',
      'stats.zero': '0',
      'stats.threshold': 'Barrier',

      // Filters
      'filters.all': 'All',
      'filters.aria': 'Filters',
      'filters.byType': 'Filter by type',

      // Content Sections
      'section.video.title': 'Video Works',
      'section.video.desc': 'AI self-directed, easily create professional videos',
      'section.video.aria': 'Video List',
      'section.game.title': 'Game Prototypes',
      'section.game.desc': 'Quickly validate ideas, from concept to playable in minutes',
      'section.game.aria': 'Game List',

      // Loading
      'loading': 'Loading',

      // Cards
      'card.featured': 'Featured',
      'card.play': 'Play Game',
      'card.playVideo': 'Play Video',
      'card.playAria': 'Start playing',

      // Game Meta
      'meta.players': 'Players',
      'meta.controls': 'Controls',
      'difficulty.easy': 'Easy',
      'difficulty.medium': 'Medium',
      'difficulty.hard': 'Hard',

      // No Results
      'noResults.video.title': 'No videos found',
      'noResults.game.title': 'No games found',
      'noResults.hint': 'Try other keywords or clear filters',
      'noResults.reset': 'Reset Filters',

      // Features Section
      'features.title': 'Why Choose PinableLab',
      'features.speed.title': 'Rapid Creation',
      'features.speed.desc': 'AI-assisted workflow, from idea to finished product in minutes',
      'features.ai.title': 'Smart Generation',
      'features.ai.desc': 'Describe your idea, AI automatically generates professional content',
      'features.publish.title': 'One-Click Publish',
      'features.publish.desc': 'Instant preview, one-click deploy, works go live immediately',
      'features.integrate.title': 'Seamless Integration',
      'features.integrate.desc': 'Use directly in VSCode plugin, fits into dev workflow',

      // CTA Section
      'cta.title': 'Ready to unleash your creativity?',
      'cta.desc': 'Download the VSCode plugin now and start your AI creative journey',
      'cta.download': 'Free Download',
      'cta.guide': 'User Guide',

      // Footer
      'footer.brand.desc': 'AI-powered creative lab, empowering everyone to be a creator.',
      'footer.products': 'Products',
      'footer.resources': 'Resources',
      'footer.guide': 'User Guide',
      'footer.stats': 'Statistics',
      'footer.contentTypes': 'Content Types',
      'footer.videoTypes': 'Video - Shorts / Tutorials / Promos',
      'footer.gameTypes': 'Games - Casual / Puzzle / Action',
      'footer.followUs': 'Follow Us',
      'footer.copyright': '© 2026 PinableLab. All rights reserved.',

      // Language Switcher
      'lang.switch': 'Switch Language',
      'lang.current': 'Current Language',

      // Video Player
      'video.playing': 'Now playing',
      'video.devNote': '(Video playback feature in development)',

      // Tags (通用标签)
      'tag.全部': 'All',

      // Tags (游戏标签)
      'tag.休闲': 'Casual',
      'tag.益智': 'Puzzle',
      'tag.射击': 'Shooter',
      'tag.冒险': 'Adventure',
      'tag.平台': 'Platform',
      'tag.经典': 'Classic',
      'tag.可爱': 'Cute',
      'tag.动作': 'Action',
      'tag.策略': 'Strategy',
      'tag.竞速': 'Racing',

      // Video Tags
      'tag.产品演示': 'Product Demo',
      'tag.AI生成': 'AI Generated',
      'tag.教程': 'Tutorial',
      'tag.入门': 'Getting Started',
      'tag.创意': 'Creative',
      'tag.短片': 'Short Film'
    }
  },

  /**
   * 初始化多语言
   */
  init() {
    // 从 localStorage 读取语言偏好
    const savedLang = localStorage.getItem('pinablelab-lang');
    if (savedLang && this.supportedLangs[savedLang]) {
      this.currentLang = savedLang;
    } else {
      // 检测浏览器语言
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('zh')) {
        this.currentLang = 'zh-CN';
      } else {
        this.currentLang = 'en';
      }
    }

    // 更新 HTML lang 属性
    document.documentElement.lang = this.currentLang === 'zh-CN' ? 'zh-CN' : 'en';

    return this.currentLang;
  },

  /**
   * 获取翻译文本
   * @param {string} key - 翻译键
   * @param {object} params - 替换参数 (可选)
   * @returns {string}
   */
  t(key, params = {}) {
    const translation = this.translations[this.currentLang]?.[key]
      || this.translations['zh-CN']?.[key]
      || key;

    // 支持参数替换 {{param}}
    return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match;
    });
  },

  /**
   * 切换语言
   * @param {string} lang - 语言代码
   */
  setLang(lang) {
    if (!this.supportedLangs[lang]) {
      console.warn(`Unsupported language: ${lang}`);
      return false;
    }

    this.currentLang = lang;
    localStorage.setItem('pinablelab-lang', lang);
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';

    // 触发自定义事件
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));

    return true;
  },

  /**
   * 获取当前语言
   */
  getLang() {
    return this.currentLang;
  },

  /**
   * 获取支持的语言列表
   */
  getSupportedLangs() {
    return this.supportedLangs;
  },

  /**
   * 翻译标签
   * @param {string} tag - 原始标签
   */
  translateTag(tag) {
    return this.t(`tag.${tag}`) || tag;
  }
};

// 全局快捷函数
function t(key, params) {
  return I18N.t(key, params);
}

// 导出
if (typeof window !== 'undefined') {
  window.I18N = I18N;
  window.t = t;
}
