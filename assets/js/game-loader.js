/**
 * GameLoader 类
 * 负责加载和管理游戏模态窗口
 */
class GameLoader {
  constructor() {
    this.games = GAMES_CONFIG;
    this.currentGame = null;
    this.modal = null;
    this.modalOverlay = null;
    this.iframe = null;
    this.btnBack = null;
    this.btnClose = null;
  }

  /**
   * 初始化游戏加载器
   */
  init() {
    this.createModal();
    this.bindEvents();
  }

  /**
   * 创建模态窗口DOM结构
   */
  createModal() {
    // 检查是否已存在
    if (document.getElementById('game-modal')) {
      this.setupModalReferences();
      return;
    }

    // 创建模态窗口
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.id = 'game-modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <button class="btn-back" id="btn-back" aria-label="返回游戏列表">
            <i data-lucide="arrow-left"></i>
            <span>返回</span>
          </button>
          <button class="btn-close" id="btn-close" aria-label="关闭">
            <i data-lucide="x"></i>
          </button>
        </div>
        <div class="modal-body">
          <iframe id="game-iframe" title="游戏窗口" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.setupModalReferences();

    // 初始化图标
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /**
   * 设置模态窗口DOM引用
   */
  setupModalReferences() {
    this.modal = document.getElementById('game-modal');
    this.modalOverlay = this.modal.querySelector('.modal-overlay');
    this.iframe = document.getElementById('game-iframe');
    this.btnBack = document.getElementById('btn-back');
    this.btnClose = document.getElementById('btn-close');
  }

  /**
   * 加载游戏
   * @param {string} gameId - 游戏ID
   */
  loadGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (!game) {
      console.error(`Game not found: ${gameId}`);
      return;
    }

    this.currentGame = game;
    this.showModal();
    this.loadGameInIframe(game.filename);

    // 记录游戏访问（可选）
    this.trackGameView(game);
  }

  /**
   * 在iframe中加载游戏
   * @param {string} filename - 游戏文件名
   */
  loadGameInIframe(filename) {
    const path = `games/${filename}`;
    
    // 显示加载状态
    this.showLoading();
    
    // 加载游戏
    this.iframe.src = path;
    
    // 监听加载完成
    this.iframe.onload = () => {
      this.hideLoading();
    };

    // 监听加载错误
    this.iframe.onerror = () => {
      this.hideLoading();
      this.showError('游戏加载失败，请刷新页面重试。');
    };
  }

  /**
   * 显示模态窗口
   */
  showModal() {
    if (!this.modal) return;
    
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 聚焦到关闭按钮（可访问性）
    setTimeout(() => {
      if (this.btnClose) {
        this.btnClose.focus();
      }
    }, 100);
  }

  /**
   * 隐藏模态窗口
   */
  hideModal() {
    if (!this.modal) return;
    
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // 清空iframe
    if (this.iframe) {
      this.iframe.src = '';
    }
    
    this.currentGame = null;
  }

  /**
   * 显示加载状态
   */
  showLoading() {
    if (!this.iframe) return;
    
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.id = 'game-loading';
    loadingDiv.innerHTML = '<div class="spinner"></div>';
    
    const modalBody = this.iframe.parentElement;
    modalBody.appendChild(loadingDiv);
  }

  /**
   * 隐藏加载状态
   */
  hideLoading() {
    const loadingDiv = document.getElementById('game-loading');
    if (loadingDiv) {
      loadingDiv.remove();
    }
  }

  /**
   * 显示错误信息
   * @param {string} message - 错误消息
   */
  showError(message) {
    if (!this.iframe) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: var(--text-primary);
      padding: var(--spacing-xl);
    `;
    errorDiv.innerHTML = `
      <i data-lucide="alert-circle" style="width: 48px; height: 48px; margin: 0 auto var(--spacing-md); color: var(--color-danger);"></i>
      <p style="font-size: var(--text-lg); margin-bottom: var(--spacing-md);">${message}</p>
      <button class="btn-play" onclick="location.reload()">
        <i data-lucide="refresh-cw"></i>
        <span>刷新页面</span>
      </button>
    `;
    
    const modalBody = this.iframe.parentElement;
    modalBody.appendChild(errorDiv);
    
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  /**
   * 绑定事件监听
   */
  bindEvents() {
    // 返回按钮
    if (this.btnBack) {
      this.btnBack.addEventListener('click', () => this.hideModal());
    }

    // 关闭按钮
    if (this.btnClose) {
      this.btnClose.addEventListener('click', () => this.hideModal());
    }

    // 点击遮罩层关闭
    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', () => this.hideModal());
    }

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentGame) {
        this.hideModal();
      }
    });

    // 阻止模态内容点击冒泡
    const modalContent = this.modal?.querySelector('.modal-content');
    if (modalContent) {
      modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  /**
   * 记录游戏访问（可选功能）
   * @param {Object} game - 游戏对象
   */
  trackGameView(game) {
    // 可以在这里添加分析代码
    console.log(`Game viewed: ${game.title}`);
    
    // 示例：保存到localStorage
    try {
      const views = JSON.parse(localStorage.getItem('gameViews') || '{}');
      views[game.id] = (views[game.id] || 0) + 1;
      localStorage.setItem('gameViews', JSON.stringify(views));
    } catch (e) {
      console.error('Failed to track game view:', e);
    }
  }

  /**
   * 获取游戏访问次数
   * @param {string} gameId - 游戏ID
   * @returns {number} 访问次数
   */
  getGameViews(gameId) {
    try {
      const views = JSON.parse(localStorage.getItem('gameViews') || '{}');
      return views[gameId] || 0;
    } catch (e) {
      return 0;
    }
  }
}