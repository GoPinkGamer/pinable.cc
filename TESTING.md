# 测试指南

本文档提供 Pinable Game Prototypes 的完整测试指南。

## 🧪 测试清单

### 功能测试

#### 1. 页面加载
- [ ] 页面能正常加载
- [ ] 所有 CSS 文件正确加载
- [ ] 所有 JavaScript 文件正确加载
- [ ] Lucide 图标正确显示
- [ ] 字体正确加载（Poppins, Outfit）

#### 2. 游戏列表
- [ ] 游戏卡片正确显示
- [ ] 游戏标题、描述显示正确
- [ ] 游戏标签显示正确
- [ ] 游戏元信息（难度、玩家数、操作方式）显示正确
- [ ] 精选徽章显示正确
- [ ] 缩略图正确加载（或显示占位图）

#### 3. 搜索功能
- [ ] 搜索框可以输入
- [ ] 实时搜索工作正常
- [ ] 搜索结果正确
- [ ] 无结果时显示提示
- [ ] Ctrl+K 快捷键聚焦搜索框
- [ ] 清空搜索框恢复所有游戏

#### 4. 标签筛选
- [ ] 标签按钮正确显示
- [ ] 点击标签切换选中状态
- [ ] 筛选结果正确
- [ ] 多标签筛选工作正常
- [ ] 取消所有标签恢复所有游戏

#### 5. 游戏启动
- [ ] 点击"开始游戏"按钮打开模态窗口
- [ ] 模态窗口动画流畅
- [ ] 游戏在 iframe 中正确加载
- [ ] 游戏可以正常运行
- [ ] 游戏控制正常工作

#### 6. 模态窗口
- [ ] 返回按钮关闭模态窗口
- [ ] 关闭按钮关闭模态窗口
- [ ] ESC 键关闭模态窗口
- [ ] 点击遮罩层关闭模态窗口
- [ ] 关闭后 iframe 正确清空
- [ ] 关闭后页面滚动恢复

#### 7. 广告显示
- [ ] 顶部横幅广告显示
- [ ] 广告不遮挡内容
- [ ] 广告响应式适配

### 响应式测试

#### 移动设备（< 640px）
- [ ] 布局正确（1列）
- [ ] 搜索框适配
- [ ] 标签按钮适配
- [ ] 游戏卡片适配
- [ ] 模态窗口全屏显示
- [ ] 触摸操作流畅

#### 平板设备（641px - 1024px）
- [ ] 布局正确（2列）
- [ ] 所有元素正确显示
- [ ] 触摸和鼠标操作都正常

#### 桌面设备（> 1025px）
- [ ] 布局正确（3-4列）
- [ ] 所有元素正确显示
- [ ] 鼠标悬停效果正常

#### 横屏模式
- [ ] 移动设备横屏布局正确
- [ ] 平板设备横屏布局正确

### 浏览器兼容性测试

#### Chrome
- [ ] 最新版本正常工作
- [ ] 所有功能正常
- [ ] 性能良好

#### Firefox
- [ ] 最新版本正常工作
- [ ] 所有功能正常
- [ ] 性能良好

#### Safari
- [ ] 最新版本正常工作
- [ ] 所有功能正常
- [ ] 性能良好

#### Edge
- [ ] 最新版本正常工作
- [ ] 所有功能正常
- [ ] 性能良好

#### 移动浏览器
- [ ] iOS Safari 正常工作
- [ ] Chrome Mobile 正常工作
- [ ] 触摸操作流畅

### 性能测试

#### Lighthouse 评分
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 90

#### 加载性能
- [ ] 首次内容绘制 (FCP) < 1.5s
- [ ] 最大内容绘制 (LCP) < 2.5s
- [ ] 首次输入延迟 (FID) < 100ms
- [ ] 累积布局偏移 (CLS) < 0.1

#### 运行时性能
- [ ] 动画流畅（60fps）
- [ ] 搜索响应快速（< 100ms）
- [ ] 页面滚动流畅
- [ ] 无内存泄漏

### 可访问性测试

#### 键盘导航
- [ ] Tab 键可以切换焦点
- [ ] Enter 键可以激活按钮
- [ ] ESC 键可以关闭模态窗口
- [ ] 焦点指示器清晰可见

#### 屏幕阅读器
- [ ] 所有图片有 alt 文本
- [ ] 所有按钮有 aria-label
- [ ] 语义化 HTML 标签
- [ ] ARIA 标签正确使用

#### 对比度
- [ ] 文字对比度 ≥ 4.5:1
- [ ] 大文字对比度 ≥ 3:1
- [ ] 交互元素清晰可见

### SEO 测试

#### Meta 标签
- [ ] title 标签存在且描述准确
- [ ] description 标签存在且描述准确
- [ ] keywords 标签存在
- [ ] Open Graph 标签完整
- [ ] Twitter Card 标签完整

#### 结构化数据
- [ ] JSON-LD 结构化数据正确
- [ ] 通过 Google 结构化数据测试

#### 其他
- [ ] robots.txt 存在且配置正确
- [ ] sitemap.xml 存在且格式正确
- [ ] HTTPS 启用
- [ ] 页面加载速度快

### 安全性测试

#### HTTPS
- [ ] 强制 HTTPS
- [ ] 证书有效
- [ ] 无混合内容警告

#### 内容安全
- [ ] 无 XSS 漏洞
- [ ] 无 CSRF 漏洞
- [ ] 外部链接使用 rel="noopener noreferrer"

## 🔧 测试工具

### 在线工具
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### 浏览器开发工具
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector
- Edge DevTools

### 响应式测试
- Chrome DevTools Device Mode
- [Responsively App](https://responsively.app/)
- [BrowserStack](https://www.browserstack.com/)

### 可访问性测试
- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Chrome Lighthouse Accessibility Audit

## 📝 测试步骤

### 1. 本地测试

```bash
# 启动本地服务器
python -m http.server 8000

# 或使用 Node.js
npx http-server

# 访问 http://localhost:8000
```

### 2. 功能测试

1. 打开浏览器访问本地服务器
2. 按照功能测试清单逐项测试
3. 记录发现的问题
4. 修复问题后重新测试

### 3. 响应式测试

1. 打开 Chrome DevTools
2. 切换到 Device Mode
3. 测试不同设备尺寸
4. 测试横屏和竖屏
5. 在真实设备上测试

### 4. 性能测试

```bash
# 运行 Lighthouse
lighthouse http://localhost:8000 --view

# 或在 Chrome DevTools 中运行
# DevTools > Lighthouse > Generate report
```

### 5. 可访问性测试

1. 使用键盘导航测试
2. 使用屏幕阅读器测试
3. 运行 WAVE 或 axe 测试
4. 检查对比度

### 6. 浏览器兼容性测试

在每个目标浏览器中：
1. 测试所有功能
2. 检查视觉效果
3. 测试性能
4. 记录问题

## 🐛 常见问题

### 游戏无法加载
**症状：** iframe 显示空白

**检查：**
1. 浏览器控制台错误
2. 游戏文件路径
3. 游戏文件是否存在
4. CORS 设置

### 搜索不工作
**症状：** 输入搜索词无反应

**检查：**
1. JavaScript 控制台错误
2. config.js 是否正确加载
3. 游戏配置是否正确

### 样式显示异常
**症状：** 页面样式混乱

**检查：**
1. CSS 文件是否正确加载
2. 浏览器缓存
3. CSS 文件路径
4. 浏览器兼容性

### 性能问题
**症状：** 页面加载慢或卡顿

**检查：**
1. 图片大小
2. JavaScript 执行时间
3. 网络请求数量
4. 浏览器性能分析

## 📊 测试报告模板

```markdown
# 测试报告

**测试日期：** YYYY-MM-DD
**测试人员：** 姓名
**测试环境：** 浏览器版本、操作系统

## 测试结果

### 功能测试
- 通过：X/Y
- 失败：Z

### 响应式测试
- 通过：X/Y
- 失败：Z

### 性能测试
- Lighthouse 评分：XX/100
- FCP：X.Xs
- LCP：X.Xs

### 发现的问题
1. 问题描述
   - 严重程度：高/中/低
   - 复现步骤：...
   - 预期结果：...
   - 实际结果：...

## 建议
- 建议 1
- 建议 2
```

## ✅ 部署前最终检查

- [ ] 所有功能测试通过
- [ ] 所有响应式测试通过
- [ ] Lighthouse 评分 > 90
- [ ] 无控制台错误
- [ ] 无控制台警告
- [ ] 所有链接有效
- [ ] 广告正确显示
- [ ] SEO 优化完成
- [ ] 可访问性测试通过
- [ ] 浏览器兼容性测试通过

---

**测试完成后，您的网站就可以部署了！** 🚀