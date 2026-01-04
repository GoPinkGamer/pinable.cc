/**
 * 游戏配置文件
 * 定义所有游戏的元数据和配置
 */

const GAMES_CONFIG = [
  {
    id: 'bubble-shooter',
    filename: 'bubble_shooter_1.html',
    title: '🎯 泡泡龙',
    description: '经典泡泡射击游戏，消除相同颜色的泡泡，挑战高分！',
    longDescription: '这是一款经典的泡泡射击游戏。通过瞄准和发射泡泡，消除三个或更多相同颜色的泡泡。游戏包含多个关卡，难度逐渐增加。支持鼠标操作，简单易上手。',
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
    longDescription: '在这个可爱的平台游戏中，控制小青蛙在荷叶间跳跃，收集花朵获得分数。注意时间限制和生命值，尽可能获得高分！支持键盘和触摸操作。',
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
 * 为不同的游戏标签定义颜色
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
 * @returns {Array<string>} 标签数组
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
 * @param {string} gameId - 游戏ID
 * @returns {Object|null} 游戏配置对象
 */
function getGameById(gameId) {
  return GAMES_CONFIG.find(game => game.id === gameId) || null;
}

/**
 * 获取精选游戏
 * @returns {Array<Object>} 精选游戏数组
 */
function getFeaturedGames() {
  return GAMES_CONFIG.filter(game => game.featured);
}

/**
 * 按难度筛选游戏
 * @param {string} difficulty - 难度等级
 * @returns {Array<Object>} 游戏数组
 */
function getGamesByDifficulty(difficulty) {
  return GAMES_CONFIG.filter(game => game.difficulty === difficulty);
}