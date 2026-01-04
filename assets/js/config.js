/**
 * 原型配置文件
 * 自动生成于: $(date)
 */

const GAMES_CONFIG = [
  {
    id: 'bubble-shooter-1',
    filename: 'bubble_shooter_1.html',
    title: '🎯 泡泡龙',
    description: '经典泡泡射击游戏，消除相同颜色的泡泡，挑战高分！',
    longDescription: '经典泡泡射击游戏，消除相同颜色的泡泡，挑战高分！',
    tags: ['休闲', '益智', '射击', '经典'],
    theme: 'bubble_shooter_1_theme.css',
    thumbnail: 'assets/images/game-thumbnails/bubble-shooter-1.png',
    featured: true,
    difficulty: 'easy',
    players: '单人',
    controls: '鼠标点击',
    addedDate: '2026-01-04'
  }
,
  {
    id: 'frog-travel-game-1',
    filename: 'frog_travel_game_1.html',
    title: '🐸 小青蛙旅行',
    description: '帮助小青蛙跳跃收集花朵，探索美丽的世界！',
    longDescription: '帮助小青蛙跳跃收集花朵，探索美丽的世界！',
    tags: ['冒险', '平台', '休闲', '可爱'],
    theme: 'frog_travel_game_1_theme.css',
    thumbnail: 'assets/images/game-thumbnails/frog-travel-game-1.png',
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
  // 应用类型
  '知识点': '#3b82f6',
  '流程': '#8b5cf6',
  '教育': '#10b981',
  '演示': '#f59e0b',
  '可视化': '#06b6d4',
  
  // 游戏类型
  '休闲': '#4ade80',
  '益智': '#60a5fa',
  '射击': '#f87171',
  '冒险': '#fbbf24',
  '平台': '#a78bfa',
  '经典': '#ec4899',
  '可爱': '#fb923c',
  '动作': '#f97316',
  '策略': '#06b6d4',
  '竞速': '#ef4444',
  
  // 学科领域
  '数学': '#6366f1',
  '物理': '#ec4899',
  '编程': '#14b8a6',
  '历史': '#f97316',
  '语言': '#a855f7',
  
  // 功能特性
  '交互': '#22c55e',
  '动画': '#eab308',
  '图表': '#0ea5e9',
  '测试': '#f43f5e'
};

/**
 * 难度等级配置
 */
const DIFFICULTY_CONFIG = {
  'easy': { 
    label: '简单', 
    color: '#4ade80', 
    icon: '⭐' 
  },
  'medium': { 
    label: '中等', 
    color: '#fbbf24', 
    icon: '⭐⭐' 
  },
  'hard': { 
    label: '困难', 
    color: '#f87171', 
    icon: '⭐⭐⭐' 
  }
};

/**
 * 获取所有唯一标签
 */
function getAllTags() {
  const tagsSet = new Set();
  GAMES_CONFIG.forEach(game => {
    game.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

/**
 * 根据ID获取游戏配置
 */
function getGameById(gameId) {
  return GAMES_CONFIG.find(game => game.id === gameId) || null;
}

/**
 * 获取精选原型
 */
function getFeaturedGames() {
  return GAMES_CONFIG.filter(game => game.featured);
}

/**
 * 按难度筛选原型
 */
function getGamesByDifficulty(difficulty) {
  return GAMES_CONFIG.filter(game => game.difficulty === difficulty);
}

/**
 * 按标签筛选原型
 */
function getGamesByTag(tag) {
  return GAMES_CONFIG.filter(game => game.tags.includes(tag));
}

/**
 * 获取原型类型统计
 */
function getPrototypeStats() {
  const stats = {
    total: GAMES_CONFIG.length,
    featured: getFeaturedGames().length,
    byDifficulty: {},
    byTag: {}
  };
  
  // 统计难度分布
  GAMES_CONFIG.forEach(game => {
    stats.byDifficulty[game.difficulty] = (stats.byDifficulty[game.difficulty] || 0) + 1;
  });
  
  // 统计标签分布
  GAMES_CONFIG.forEach(game => {
    game.tags.forEach(tag => {
      stats.byTag[tag] = (stats.byTag[tag] || 0) + 1;
    });
  });
  
  return stats;
}
