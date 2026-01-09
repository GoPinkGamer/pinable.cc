/**
 * 游戏配置文件
 */

const GAMES_CONFIG = [
  {
    id: 'bubble-shooter-1',
    filename: 'bubble_shooter_1.html',
    title: '泡泡龙',
    description: '经典泡泡射击游戏，消除相同颜色的泡泡，挑战高分！',
    longDescription: '经典泡泡射击游戏，消除相同颜色的泡泡，挑战高分！',
    tags: ['休闲', '益智', '射击', '经典'],
    theme: 'bubble_shooter_1_theme.css',
    thumbnail: null,
    featured: true,
    difficulty: 'easy',
    players: '单人',
    controls: '鼠标点击',
    addedDate: '2026-01-05'
  },
  {
    id: 'frog-travel-game-1',
    filename: 'frog_travel_game_1.html',
    title: '小青蛙旅行',
    description: '帮助小青蛙跳跃收集花朵，探索美丽的世界！',
    longDescription: '帮助小青蛙跳跃收集花朵，探索美丽的世界！',
    tags: ['冒险', '平台', '休闲', '可爱'],
    theme: 'frog_travel_game_1_theme.css',
    thumbnail: null,
    featured: true,
    difficulty: 'medium',
    players: '单人',
    controls: '键盘/触摸',
    addedDate: '2026-01-05'
  },
  {
    id: 'chinese-chess-1-3',
    filename: 'chinese_chess_1_3.html',
    title: '中国象棋 v3',
    description: '经典中国象棋游戏，体验传统棋艺的魅力！',
    longDescription: '经典中国象棋游戏，体验传统棋艺的魅力！',
    tags: ['策略', '益智', '经典'],
    theme: 'chinese_chess_1_3_theme.css',
    thumbnail: null,
    featured: true,
    difficulty: 'medium',
    players: '双人',
    controls: '鼠标点击',
    addedDate: '2026-01-05'
  },
  {
    id: 'chinese-chess-1-2',
    filename: 'chinese_chess_1_2.html',
    title: '中国象棋 v2',
    description: '经典中国象棋游戏，体验传统棋艺的魅力！',
    longDescription: '经典中国象棋游戏，体验传统棋艺的魅力！',
    tags: ['策略', '益智', '经典'],
    theme: 'chinese_chess_1_2_theme.css',
    thumbnail: null,
    featured: false,
    difficulty: 'medium',
    players: '双人',
    controls: '鼠标点击',
    addedDate: '2026-01-05'
  },
  {
    id: 'chinese-chess-1',
    filename: 'chinese_chess_1.html',
    title: '中国象棋 v1',
    description: '经典中国象棋游戏，体验传统棋艺的魅力！',
    longDescription: '经典中国象棋游戏，体验传统棋艺的魅力！',
    tags: ['策略', '益智', '经典'],
    theme: 'chinese_chess_1_theme.css',
    thumbnail: null,
    featured: false,
    difficulty: 'medium',
    players: '双人',
    controls: '鼠标点击',
    addedDate: '2026-01-05'
  },
  {
    id: '2048-game-1',
    filename: '2048_game_1.html',
    title: '2048',
    description: '滑动数字方块，合并相同数字，挑战2048！',
    longDescription: '滑动数字方块，合并相同数字，挑战2048！',
    tags: ['休闲', '益智', '经典'],
    theme: '2048_game_1_theme.css',
    thumbnail: null,
    featured: true,
    difficulty: 'easy',
    players: '单人',
    controls: '方向键/滑动',
    addedDate: '2026-01-05'
  },
  {
    id: 'chinese-chess-1-1',
    filename: 'chinese_chess_1_1.html',
    title: '中国象棋 v1.1',
    description: '经典中国象棋游戏，体验传统棋艺的魅力！',
    longDescription: '经典中国象棋游戏，体验传统棋艺的魅力！',
    tags: ['策略', '益智', '经典'],
    theme: 'chinese_chess_1_1_theme.css',
    thumbnail: null,
    featured: false,
    difficulty: 'medium',
    players: '双人',
    controls: '鼠标点击',
    addedDate: '2026-01-05'
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
  '可爱': '#fb923c',
  '动作': '#f97316',
  '策略': '#06b6d4',
  '竞速': '#ef4444'
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
 * 获取精选游戏
 */
function getFeaturedGames() {
  return GAMES_CONFIG.filter(game => game.featured);
}

/**
 * 按难度筛选游戏
 */
function getGamesByDifficulty(difficulty) {
  return GAMES_CONFIG.filter(game => game.difficulty === difficulty);
}
