# Expo Stack Template

An out-of-the-box Expo project template integrated with a modern mobile development tech stack.

**Core Features:**
*   **Expo Router**: File-based routing system.
*   **NativeWind (TailwindCSS)**: Utility-first styling solution.
*   **Zustand**: Lightweight global state management.
*   **Supabase**: Backend-as-a-Service (BaaS) integration.
*   **React Query**: Server state management and caching.
*   **TypeScript**: Full type safety.

---

## 🚀 Quick Start

### 1. Use the Template

Click the "Use this template" button at the top right of the GitHub repository to create your own repository, or clone it directly:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Initialize and Rename

We provide a wizard script to help you quickly modify the project name, package name, and other configurations.

```bash
# 1. Install dependencies
npm install

# 2. Run the rename script
npm run rename
```
> Follow the prompts to enter your new Project Name, Scheme, and Bundle ID.

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

### 4. Start the Project

```bash
# Reset cache and regenerate iOS/Android directories
npm run reset

# Start the development server
npm run start
```

---

## 📂 Project Structure

```text
src/
├── app/                 # [Routing Layer] Expo Router page files
│   ├── (auth)/          # Group: Login/Register (No bottom tab)
│   ├── (tabs)/          # Group: Main Tab bar
│   └── _layout.tsx      # Global entry (Providers injected here)
│
├── components/          # [UI Component Layer]
│   ├── ui/              # Dumb components (Button, Input, Avatar) - Pure display, no business logic
│   └── business/        # Business components (ChatList, LoginForm) - Complexity involving business logic
│
├── hooks/               # [Logic Layer - Repository]
│   ├── queries/         # useQuery wrappers (useUser, useMessages)
│   ├── mutations/       # useMutation wrappers (useLogin, useSendMessage)
│   └── useDebounce.ts   # General Hooks
│
├── services/            # [API Layer - Service]
│   ├── api.ts           # Axios or fetch wrapper
│   ├── authService.ts   # Specific business API functions
│   └── supabase.ts      # Supabase client instance
│
├── stores/              # [Global State Layer - Zustand]
│   ├── useAuthStore.ts  # Stores Token, User basic info
│   └── useAppStore.ts   # Stores Theme, Settings
│
├── tests/               # [Test Layer]
│   ├── components/      # UI component tests
│   ├── services/        # API service tests
│   └── utils/           # Utility function tests
│
├── utils/               # [Utility Layer] Pure functions
│   ├── date.ts          # Date formatting
│   └── validations.ts   # Regex (if not using Zod)
│
├── constants/           # [Constant Layer] 
│   ├── Colors.ts        # Theme colors
│   ├── Config.ts        # Keys, URLs only
│   └── Styles.ts        # Global common styles
│
├── types/               # [Type Definition Layer] 
│   ├── user.d.ts        # User interface definition
│   └── api.d.ts         # API response structure definition
│
└── assets/              # [Resource Layer]
    ├── images/
    └── fonts/
```