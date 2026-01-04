/**
 * SearchEngine 类
 * 实现游戏搜索和筛选功能
 */
class SearchEngine {
  constructor(games) {
    this.games = games;
    this.filteredGames = games;
    this.searchTerm = '';
    this.selectedTags = new Set();
    this.selectedDifficulty = null;
  }

  /**
   * 执行搜索
   * @param {string} term - 搜索词
   * @returns {Array<Object>} 搜索结果
   */
  search(term) {
    this.searchTerm = term.toLowerCase().trim();
    return this.applyFilters();
  }

  /**
   * 切换标签筛选
   * @param {string} tag - 标签名
   * @returns {Array<Object>} 筛选结果
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
   * 设置难度筛选
   * @param {string|null} difficulty - 难度等级
   * @returns {Array<Object>} 筛选结果
   */
  setDifficulty(difficulty) {
    this.selectedDifficulty = difficulty;
    return this.applyFilters();
  }

  /**
   * 应用所有筛选条件
   * @returns {Array<Object>} 筛选后的游戏列表
   */
  applyFilters() {
    let results = this.games;

    // 搜索词筛选
    if (this.searchTerm) {
      results = results.filter(game => 
        this.matchesSearchTerm(game, this.searchTerm)
      );
    }

    // 标签筛选
    if (this.selectedTags.size > 0) {
      results = results.filter(game =>
        this.matchesTags(game, this.selectedTags)
      );
    }

    // 难度筛选
    if (this.selectedDifficulty) {
      results = results.filter(game =>
        game.difficulty === this.selectedDifficulty
      );
    }

    this.filteredGames = results;
    return results;
  }

  /**
   * 检查游戏是否匹配搜索词
   * @param {Object} game - 游戏对象
   * @param {string} term - 搜索词
   * @returns {boolean} 是否匹配
   */
  matchesSearchTerm(game, term) {
    const searchableText = [
      game.title,
      game.description,
      game.longDescription,
      ...game.tags,
      game.difficulty,
      game.players,
      game.controls
    ].join(' ').toLowerCase();

    return searchableText.includes(term);
  }

  /**
   * 检查游戏是否匹配标签
   * @param {Object} game - 游戏对象
   * @param {Set<string>} tags - 标签集合
   * @returns {boolean} 是否匹配
   */
  matchesTags(game, tags) {
    return game.tags.some(tag => tags.has(tag));
  }

  /**
   * 重置所有筛选
   * @returns {Array<Object>} 所有游戏
   */
  reset() {
    this.searchTerm = '';
    this.selectedTags.clear();
    this.selectedDifficulty = null;
    this.filteredGames = this.games;
    return this.games;
  }

  /**
   * 获取当前筛选状态
   * @returns {Object} 筛选状态
   */
  getFilterState() {
    return {
      searchTerm: this.searchTerm,
      selectedTags: Array.from(this.selectedTags),
      selectedDifficulty: this.selectedDifficulty,
      resultCount: this.filteredGames.length
    };
  }

  /**
   * 检查是否有活动筛选
   * @returns {boolean} 是否有筛选
   */
  hasActiveFilters() {
    return this.searchTerm !== '' || 
           this.selectedTags.size > 0 || 
           this.selectedDifficulty !== null;
  }

  /**
   * 获取搜索建议
   * @param {string} term - 搜索词
   * @param {number} limit - 建议数量限制
   * @returns {Array<string>} 建议列表
   */
  getSuggestions(term, limit = 5) {
    if (!term || term.length < 2) return [];

    const suggestions = new Set();
    const lowerTerm = term.toLowerCase();

    // 从游戏标题中提取建议
    this.games.forEach(game => {
      if (game.title.toLowerCase().includes(lowerTerm)) {
        suggestions.add(game.title);
      }
    });

    // 从标签中提取建议
    this.games.forEach(game => {
      game.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerTerm)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, limit);
  }

  /**
   * 按相关性排序结果
   * @param {string} term - 搜索词
   * @returns {Array<Object>} 排序后的结果
   */
  sortByRelevance(term) {
    if (!term) return this.filteredGames;

    const lowerTerm = term.toLowerCase();
    
    return [...this.filteredGames].sort((a, b) => {
      const aScore = this.calculateRelevanceScore(a, lowerTerm);
      const bScore = this.calculateRelevanceScore(b, lowerTerm);
      return bScore - aScore;
    });
  }

  /**
   * 计算相关性分数
   * @param {Object} game - 游戏对象
   * @param {string} term - 搜索词
   * @returns {number} 相关性分数
   */
  calculateRelevanceScore(game, term) {
    let score = 0;

    // 标题完全匹配
    if (game.title.toLowerCase() === term) {
      score += 100;
    }
    // 标题包含
    else if (game.title.toLowerCase().includes(term)) {
      score += 50;
    }

    // 标签匹配
    game.tags.forEach(tag => {
      if (tag.toLowerCase() === term) {
        score += 30;
      } else if (tag.toLowerCase().includes(term)) {
        score += 15;
      }
    });

    // 描述包含
    if (game.description.toLowerCase().includes(term)) {
      score += 10;
    }

    // 精选游戏加分
    if (game.featured) {
      score += 5;
    }

    return score;
  }

  /**
   * 获取筛选统计
   * @returns {Object} 统计信息
   */
  getStatistics() {
    const stats = {
      total: this.games.length,
      filtered: this.filteredGames.length,
      byDifficulty: {},
      byTag: {},
      featured: 0
    };

    // 统计难度分布
    this.filteredGames.forEach(game => {
      stats.byDifficulty[game.difficulty] = 
        (stats.byDifficulty[game.difficulty] || 0) + 1;
      
      if (game.featured) {
        stats.featured++;
      }

      // 统计标签分布
      game.tags.forEach(tag => {
        stats.byTag[tag] = (stats.byTag[tag] || 0) + 1;
      });
    });

    return stats;
  }
}