# Expo Stack Template

这是一个开箱即用的 Expo 项目模版，集成了现代化的移动端开发技术栈。

**核心特性：**
*   **Expo Router**: 基于文件的路由系统。
*   **NativeWind (TailwindCSS)**: 样式解决方案。
*   **Zustand**: 轻量级全局状态管理。
*   **Supabase**: 后端即服务 (BaaS) 集成。
*   **React Query**: 服务端状态管理与缓存。
*   **TypeScript**: 全类型安全。

---

## 🚀 快速开始

### 1. 使用模版

点击 GitHub 仓库右上角的 "Use this template" 按钮创建你自己的仓库，或直接 Clone：

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. 初始化与重命名

我们提供了一个向导脚本来帮助你快速修改项目名称、包名等配置。

```bash
# 1. 安装依赖
npm install

# 2. 运行重命名脚本
npm run rename
```
> 跟随提示输入你的新项目名称 (Project Name)、Scheme 和 Bundle ID。

### 3. 配置环境变量

复制 `.env.example` 为 `.env` 并填入你的配置：

```bash
cp .env.example .env
```

### 4. 启动项目

```bash
# 重置缓存并重新生成 iOS/Android 目录
npm run reset

# 启动开发服务器
npm run start
```

---

## 📂 项目结构

src/
├── app/                 # [路由层] Expo Router 的页面文件
│   ├── (auth)/          # 分组：登录注册 (不需要底部导航)
│   ├── (tabs)/          # 分组：主页 Tab 栏
│   └── _layout.tsx      # 全局入口 (Provider 都在这注入)
│
├── components/          # [UI 组件层]
│   ├── ui/              # 傻瓜组件 (Button, Input, Avatar) - 纯展示，无业务逻辑
│   └── business/        # 业务组件 (ChatList, LoginForm) - 稍微复杂点
│
├── hooks/               # [逻辑层 - Repository]
│   ├── queries/         # useQuery 封装 (useUser, useMessages)
│   ├── mutations/       # useMutation 封装 (useLogin, useSendMessage)
│   └── useDebounce.ts   # 通用 Hooks
│
├── services/            # [API 层 - Service] (你叫 api 也行，但 services 更广义)
│   ├── api.ts           # 封装 axios 或 fetch
│   ├── authService.ts   # 具体业务 API 函数
│   └── supabase.ts      # Supabase 客户端实例
│
├── stores/              # [全局状态层 - Zustand]
│   ├── useAuthStore.ts  # 存 Token, 用户基本信息
│   └── useAppStore.ts   # 存主题、设置
│
├── tests/               # [测试层]
│   ├── components/      # UI 组件测试
│   ├── services/        # API 服务测试
│   └── utils/           # 工具函数测试
│
├── utils/               # [工具层] 纯函数
│   ├── date.ts          # 时间格式化
│   └── validations.ts   # 如果不用 Zod，正则写这 (但你用了 Zod)
│
├── constants/           # [常量层] 
│   ├── Colors.ts        # 主题色
│   ├── Config.ts        # 只有 key、URL 配置
│   └── Styles.ts        # 全局通用样式
│
├── types/               # [类型定义层] 
│   ├── user.d.ts        # 定义 User 接口
│   └── api.d.ts         # 定义 API 返回结构
│
└── assets/              # [资源层]
    ├── images/
    └── fonts/