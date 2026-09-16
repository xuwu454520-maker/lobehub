<div align="center">

# 🍉 西瓜AI

**婉婉的专属AI助手**

基于 [LobeHub](https://github.com/lobehub/lobehub) 深度定制的 AI 助手工作台

[中文](#-中文文档) · [English](#-english-documentation)

</div>

---

## 📖 中文文档

### 项目介绍

西瓜AI 是一个面向个人与团队的自托管 AI 助手工作台。它在开源项目 LobeHub 的基础上做了品牌与体验层面的定制：深紫色主题、专属顶部标语、首页快速开始引导，以及一套完整的「西瓜AI」品牌标识。

你可以把它部署在自己的服务器或本机上，接入任意主流大模型服务商（OpenAI、Anthropic、Google、DeepSeek、Ollama 本地模型等），数据完全掌握在自己手里。

**核心定位**：一个能长期陪你工作的 AI 空间 —— 不只是聊天窗口，而是可以持续沉淀知识、编排任务、协作多个智能体的工作台。

### 功能列表

| 能力 | 说明 |
|------|------|
| 🤖 **多模型对话** | 支持 OpenAI / Anthropic / Google / DeepSeek / Azure / Ollama 等 40+ 服务商，可随时切换 |
| 🧠 **AI 助手（Agent）** | 创建带独立人设、模型、知识库与工具的助手，支持多助手协作 |
| 📚 **知识库** | 上传文档构建私有知识库，支持 RAG 检索增强 |
| 🔌 **工具与插件** | 内置工具调用、MCP 协议支持、自定义插件扩展 |
| 🖼️ **多模态** | 图片理解与生成、语音合成（TTS）、语音识别（STT） |
| 🎨 **主题定制** | 深紫色主题、12 种预设主色、明暗模式、自定义字体 |
| 🚀 **快速开始引导** | 首页三步骤引导卡片：选择模型 → 输入问题 → 获取回答 |
| 🏠 **自托管** | Docker 一键部署，数据本地存储，支持 PostgreSQL + Redis + S3 |
| 💻 **多端支持** | Web、桌面端、移动端（PWA 可安装） |

### 技术栈

- **框架**：Next.js 16（Turbopack）+ React 19
- **语言**：TypeScript 6
- **API**：tRPC 11
- **数据库**：PostgreSQL + Drizzle ORM
- **UI**：Ant Design 6 + antd-style + LobeHub UI
- **构建**：Vite 8（SPA 部分）+ Bun
- **包管理**：pnpm 12（workspace monorepo）

### 安装步骤

#### 环境要求

| 依赖 | 版本 | 说明 |
|------|------|------|
| Node.js | ≥ 22 | 推荐 22 LTS |
| pnpm | 12.4.1 | 通过 `corepack enable` 启用 |
| Bun | ≥ 1.1 | 脚本运行器 |
| Docker | 最新版 | 用于运行数据库等后端服务 |

#### 1. 克隆仓库

```bash
git clone https://github.com/xuwu454520-maker/lobehub.git
cd lobehub
```

#### 2. 启动后端服务

```bash
bun run dev:docker
```

该命令会拉起四个容器：PostgreSQL（5432）、Redis（6379）、RustFS（9000/9001）、SearXNG（8180）。

#### 3. 安装依赖

```bash
pnpm install --no-frozen-lockfile
```

> **Windows 用户注意**：如果安装后 `node_modules` 里出现大量空目录（`require('react')` 报 `MODULE_NOT_FOUND`），是 pnpm 创建符号链接失败所致，请改用 hoisted 模式重装：
>
> ```bash
> pnpm install --no-frozen-lockfile --ignore-scripts --node-linker=hoisted
> ```
>
> 详细排查步骤见下方「故障排查」。

#### 4. 配置环境变量

```bash
cp .env.example.development .env
```

如需接入模型服务，在 `.env` 中追加对应的 API Key：

```bash
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

#### 5. 初始化数据库

```bash
pnpm db:migrate
```

看到 `✅ database migration pass` 即成功。

#### 6. 启动开发服务器

```bash
bun run dev
```

启动完成后访问 **http://localhost:3010**。

> 首次启动会编译较久（约 1–2 分钟），期间页面可能短暂 500，等待 Vite 就绪后自动恢复。

### 使用说明

1. **注册登录** — 首次访问会跳转登录页，注册一个本地账号（数据存在你自己的数据库里）。
2. **选择模型** — 点击输入框上方的模型选择器，或先在「设置 → 语言模型」中填入 API Key。
3. **开始对话** — 在首页输入框中描述你的需求，回车发送。首页有三步骤引导卡片可以参考：**选择 AI 模型 → 输入你的问题 → 获取回答**。
4. **创建助手** — 在「助手」页面可以为不同场景创建专属 AI（如写作、编程、数据分析），各自绑定不同的模型与知识库。
5. **定制外观** — 「设置 → 外观」中可切换主题色（当前默认深紫）、明暗模式与字体。

### 故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| `Cannot find module 'react'`，`node_modules` 里是空目录 | pnpm 创建链接失败 | 用 `--node-linker=hoisted` 重装（见步骤 3） |
| 页面 500 / 502，日志报 `ECONNREFUSED` | 后端容器未就绪或已停止 | `bun run dev:docker`，或检查 `docker ps` 状态 |
| 日志报 `AggregateError` / Redis 连接失败 | Docker Desktop 进程被系统回收 | 重新启动 Docker Desktop，再 `docker start lobe-rustfs` |
| 改动 `index.html` 或 workspace 包后不生效 | 这些位置不支持热更新 | 重启 `bun run dev` |
| 重启后报 `Another next dev server is already running` | 旧进程未退出 | `taskkill /F /T /PID <pid>` 结束进程树后重启 |

### 开源致谢

本项目基于 [LobeHub](https://github.com/lobehub/lobehub)（MIT License）二次开发，感谢原作者及社区的开源贡献。二次开发部分仅包含品牌与界面层面的定制。

---

## 📖 English Documentation

### Introduction

**Watermelon AI (西瓜AI)** is a self-hosted AI assistant workspace for individuals and teams. Built on top of the open-source [LobeHub](https://github.com/lobehub/lobehub) project, it adds brand and experience customizations: a deep-purple theme, a custom top slogan, a quick-start guide on the home page, and a complete "西瓜AI" brand identity.

Deploy it on your own machine or server, connect to any mainstream model provider (OpenAI, Anthropic, Google, DeepSeek, local Ollama models, etc.), and keep full ownership of your data.

**Positioning**: an AI space designed to work with you long-term — not just a chat window, but a workspace where knowledge accumulates, tasks are orchestrated, and multiple agents collaborate.

### Features

| Feature | Description |
|---------|-------------|
| 🤖 **Multi-model chat** | 40+ providers including OpenAI / Anthropic / Google / DeepSeek / Azure / Ollama, switchable anytime |
| 🧠 **AI Agents** | Create assistants with their own persona, model, knowledge base and tools; multi-agent collaboration |
| 📚 **Knowledge base** | Upload documents to build a private KB with RAG retrieval |
| 🔌 **Tools & plugins** | Built-in tool calling, MCP protocol support, custom plugin extensions |
| 🖼️ **Multimodal** | Image understanding & generation, TTS, STT |
| 🎨 **Theming** | Deep-purple default, 12 preset primary colors, light/dark mode, custom fonts |
| 🚀 **Quick start guide** | Three-step onboarding card: pick a model → type your question → get the answer |
| 🏠 **Self-hosted** | One-command Docker deployment; local data via PostgreSQL + Redis + S3 |
| 💻 **Everywhere** | Web, desktop, mobile (installable PWA) |

### Tech Stack

- **Framework**: Next.js 16 (Turbopack) + React 19
- **Language**: TypeScript 6
- **API**: tRPC 11
- **Database**: PostgreSQL + Drizzle ORM
- **UI**: Ant Design 6 + antd-style + LobeHub UI
- **Build**: Vite 8 (SPA parts) + Bun
- **Package manager**: pnpm 12 (workspace monorepo)

### Installation

#### Prerequisites

| Dependency | Version | Notes |
|------------|---------|-------|
| Node.js | ≥ 22 | 22 LTS recommended |
| pnpm | 12.4.1 | Enable via `corepack enable` |
| Bun | ≥ 1.1 | Script runner |
| Docker | Latest | Runs database and backend services |

#### 1. Clone the repository

```bash
git clone https://github.com/xuwu454520-maker/lobehub.git
cd lobehub
```

#### 2. Start backend services

```bash
bun run dev:docker
```

This starts four containers: PostgreSQL (5432), Redis (6379), RustFS (9000/9001), and SearXNG (8180).

#### 3. Install dependencies

```bash
pnpm install --no-frozen-lockfile
```

> **Windows users**: if `node_modules` ends up full of empty directories (`require('react')` throws `MODULE_NOT_FOUND`), pnpm failed to create symlinks. Reinstall in hoisted mode instead:
>
> ```bash
> pnpm install --no-frozen-lockfile --ignore-scripts --node-linker=hoisted
> ```
>
> See Troubleshooting below for details.

#### 4. Configure environment variables

```bash
cp .env.example.development .env
```

Add your model provider keys to `.env` as needed:

```bash
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

#### 5. Initialize the database

```bash
pnpm db:migrate
```

You should see `✅ database migration pass`.

#### 6. Run the dev server

```bash
bun run dev
```

Then open **http://localhost:3010**.

> The first startup takes 1–2 minutes to compile. The page may briefly return 500 until Vite is ready.

### Usage

1. **Sign in** — the first visit redirects to the sign-in page; register a local account (data lives in your own database).
2. **Pick a model** — use the model selector above the composer, or add API keys under Settings → Language Models.
3. **Start chatting** — describe what you need in the home composer and press Enter. The three-step quick-start card on the home page shows the flow: **pick a model → type your question → get the answer**.
4. **Create agents** — on the Agents page, build dedicated assistants for different scenarios (writing, coding, data analysis), each with its own model and knowledge base.
5. **Customize appearance** — Settings → Appearance lets you change the primary color (deep purple by default), light/dark mode, and fonts.

### Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Cannot find module 'react'`; empty dirs in `node_modules` | pnpm failed to create links | Reinstall with `--node-linker=hoisted` (step 3) |
| Page 500 / 502, log shows `ECONNREFUSED` | Backend containers not ready or stopped | Run `bun run dev:docker`, check `docker ps` |
| Log shows `AggregateError` / Redis connection failure | Docker Desktop process was reclaimed by the OS | Restart Docker Desktop, then `docker start lobe-rustfs` |
| Changes to `index.html` or workspace packages don't apply | These paths don't support HMR | Restart `bun run dev` |
| `Another next dev server is already running` after restart | Old process still alive | `taskkill /F /T /PID <pid>` to kill the process tree, then restart |

### Acknowledgements

This project is a derivative work of [LobeHub](https://github.com/lobehub/lobehub) (MIT License). Thanks to the original authors and community. The modifications here are limited to branding and UI customization.

---

<div align="center">

**西瓜AI** · 婉婉的专属AI助手

Licensed under [MIT](./LICENSE)

</div>
