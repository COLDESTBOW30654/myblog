# 白鹿原嚒的博客

基于 Astro 构建的个人博客站点。

## 📦 安装依赖

```bash
pnpm install
```

## 🚀 开发命令

### 本地开发

```bash
pnpm dev
# 或
pnpm start
```

启动本地开发服务器，默认访问 `http://localhost:4321`

### 构建项目

```bash
pnpm build
```

构建生产版本并生成 Pagefind 搜索索引

### 预览构建结果

```bash
pnpm preview
```

预览构建后的生产版本

## 📝 内容管理

### 创建新文章

```bash
pnpm new-post
```

交互式创建新的博客文章

### 更新文章修订历史

```bash
pnpm update-diff
```

**重要**：此命令会从 Git 仓库提取所有文章的提交历史，生成 `src/json/git-history.json` 文件。

## 🔧 代码质量

### 类型检查

```bash
pnpm type-check
```

检查 TypeScript 类型错误

### 代码格式化

```bash
pnpm format
```

使用 Biome 格式化代码

### 代码检查

```bash
pnpm lint
```

使用 Biome 检查并修复代码问题

## 🚢 部署流程

### 推荐的部署流程

**重要**：每次部署前，请按以下顺序执行命令：

```bash
# 1. 更新文章修订历史（如果有文章修改）
pnpm update-diff

# 2. 提交更改
git add src/json/git-history.json
git commit -m "chore: 更新文章修订历史"

# 3. 构建项目
pnpm build

# 4. 预览构建结果（可选）
pnpm preview

# 5. 推送到远程仓库
git push origin main
```

### 构建项目

```bash
pnpm build
```

构建流程：
1. 构建 Astro 项目
2. 生成 Pagefind 搜索索引

### 手动更新文章修订历史

```bash
pnpm update-diff
```

此命令会从 Git 仓库提取所有文章的提交历史，生成 `src/json/git-history.json` 文件。

**注意**：
- ✅ 在提交代码前手动运行此命令
- ✅ 确保 `git-history.json` 文件被提交到仓库
- ⚠️ 构建时不会自动更新，需要手动执行

## ✨ 新功能说明

### 文章修订历史功能

- **自动记录**：每次运行 `pnpm update-diff` 会自动从 Git 提取文章修改历史
- **显示内容**：在文章页面底部显示修订次数、修改时间和提交信息
- **时效性提示**：自动计算文章发布和最后更新时间，提醒读者文章新鲜度
- **GitHub 链接**：点击 commit hash 可跳转到 GitHub 查看详细修改

### 文章大纲功能

- **自动生成**：根据文章标题自动生成结构化目录
- **滚动高亮**：阅读时自动高亮当前章节
- **快速跳转**：点击目录项可快速跳转到对应章节
- **固定显示**：大纲固定在页面右侧，跟随滚动保持在可视区域

## 📁 项目结构

```
├── src/
│   ├── components/        # 组件目录
│   │   └── widget/        # 小部件组件
│   │       ├── PostUpdateNotice.astro    # 文章时效性提示
│   │       └── TOC.astro                 # 目录大纲
│   ├── content/           # 内容目录
│   │   └── posts/         # 博客文章
│   ├── json/              # JSON 数据
│   │   └── git-history.json  # 文章修订历史
│   ├── utils/             # 工具函数
│   │   └── git-history.ts # Git 历史工具
│   └── pages/             # 页面路由
├── scripts/               # 脚本目录
│   ├── update-diff.js     # Git 历史生成脚本
│   ├── new-post.js        # 新建文章脚本
│   └── utils/             # 脚本工具
│       └── content-files.js
└── dist/                  # 构建输出目录
```

## 🛠️ 技术栈

- **框架**: Astro 5.x
- **UI**: Svelte 5.x
- **样式**: Tailwind CSS
- **类型**: TypeScript
- **搜索**: Pagefind
- **评论**: Giscus
- **包管理**: pnpm

## 📌 注意事项

1. **Git 历史依赖**：文章修订历史功能依赖 Git 提交记录，确保项目已初始化 Git 仓库
2. **部署前更新**：每次部署前务必运行 `pnpm update-diff` 以更新文章历史
3. **环境要求**：需要 Node.js 18+ 和 pnpm 9.x
4. **构建顺序**：必须先生成 Git 历史，再执行构建

## 🔗 相关链接

- [Astro 文档](https://docs.astro.build)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Pagefind 文档](https://pagefind.app)

## 📄 许可证

CC BY-NC-SA 4.0
