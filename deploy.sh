#!/bin/bash

# 部署脚本 - 自动复制游戏文件、生成配置、提交并推送到 GitHub

set -e  # 遇到错误立即退出

echo "🚀 开始部署流程..."

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. 创建 games 目录
echo -e "${BLUE}📁 创建 games 目录...${NC}"
mkdir -p games

# 2. 复制游戏文件
echo -e "${BLUE}📋 复制游戏文件...${NC}"
if [ -d ".chatgame/design_iterations" ]; then
    cp -r .chatgame/design_iterations/* games/
    echo -e "${GREEN}✅ 游戏文件复制完成${NC}"
else
    echo -e "${YELLOW}⚠️  .chatgame/design_iterations 目录不存在${NC}"
    exit 1
fi

# 3. 生成游戏配置
echo -e "${BLUE}⚙️  生成游戏配置...${NC}"

# 扫描 games 目录中的 HTML 文件
html_files=$(find games -maxdepth 1 -name "*.html" -type f)

if [ -z "$html_files" ]; then
    echo -e "${YELLOW}⚠️  未找到游戏文件${NC}"
    exit 1
fi

# 生成配置文件
cat > assets/js/config.js << 'EOF'
/**
 * 游戏配置文件
 * 自动生成于: $(date)
 */

const GAMES_CONFIG = [
EOF

# 遍历 HTML 文件并生成配置
index=0
for file in $html_files; do
    filename=$(basename "$file")
    game_id=$(echo "$filename" | sed 's/\.html$//' | sed 's/_/-/g')
    
    # 从文件中提取标题（如果有）- 使用兼容 macOS 的方式
    title=$(grep -o '<title>[^<]*</title>' "$file" 2>/dev/null | sed 's/<[^>]*>//g' | head -1)
    [ -z "$title" ] && title="$filename"
    
    # 根据文件名推断游戏信息
    if [[ $filename == *"bubble"* ]]; then
        emoji="🎯"
        game_title="泡泡龙"
        description="经典泡泡射击游戏，消除相同颜色的泡泡，挑战高分！"
        tags="['休闲', '益智', '射击', '经典']"
        difficulty="easy"
        controls="鼠标点击"
    elif [[ $filename == *"frog"* ]]; then
        emoji="🐸"
        game_title="小青蛙旅行"
        description="帮助小青蛙跳跃收集花朵，探索美丽的世界！"
        tags="['冒险', '平台', '休闲', '可爱']"
        difficulty="medium"
        controls="键盘/触摸"
    else
        emoji="🎮"
        # 使用 awk 实现首字母大写（兼容 macOS）
        game_title=$(echo "$filename" | sed 's/\.html$//' | sed 's/_/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
        description="有趣的游戏原型，快来体验吧！"
        tags="['休闲', '益智']"
        difficulty="easy"
        controls="鼠标/键盘"
    fi
    
    # 添加逗号（除了第一个）
    if [ $index -gt 0 ]; then
        echo "," >> assets/js/config.js
    fi
    
    # 写入配置
    cat >> assets/js/config.js << GAME_EOF
  {
    id: '$game_id',
    filename: '$filename',
    title: '$emoji $game_title',
    description: '$description',
    longDescription: '$description',
    tags: $tags,
    theme: '${filename%.html}_theme.css',
    thumbnail: 'assets/images/game-thumbnails/${game_id}.png',
    featured: true,
    difficulty: '$difficulty',
    players: '单人',
    controls: '$controls',
    addedDate: '$(date +%Y-%m-%d)'
  }
GAME_EOF
    
    index=$((index + 1))
done

# 完成配置文件
cat >> assets/js/config.js << 'EOF'
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
EOF

echo -e "${GREEN}✅ 配置文件生成完成${NC}"
echo -e "${BLUE}📊 找到 $index 个游戏${NC}"

# 4. 更新 game-loader.js 中的路径
echo -e "${BLUE}🔧 更新游戏加载路径...${NC}"
sed -i.bak "s|\.chatgame/design_iterations/|games/|g" assets/js/game-loader.js
rm -f assets/js/game-loader.js.bak
echo -e "${GREEN}✅ 路径更新完成${NC}"

# 5. Git 提交
echo -e "${BLUE}📦 提交到 Git...${NC}"
git add .
git commit -m "Deploy: Auto-generated game configuration and copied game files"
echo -e "${GREEN}✅ Git 提交完成${NC}"

# 6. 推送到远程仓库
echo -e "${BLUE}🚀 推送到 GitHub...${NC}"
GIT_SSH_COMMAND="ssh -i ~/.ssh/id_devops -o IdentitiesOnly=yes" git push -f origin main
echo -e "${GREEN}✅ 推送完成${NC}"

echo ""
echo -e "${GREEN}🎉 部署完成！${NC}"
echo -e "${BLUE}📊 游戏数量: $index${NC}"
echo -e "${BLUE}🌐 访问: https://pinable.cc${NC}"