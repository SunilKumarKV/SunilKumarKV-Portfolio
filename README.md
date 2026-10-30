# SunilCraft Portfolio

Modern, high-performance developer portfolio for **Sunil Kumar K V** — Full-Stack Developer & Systems Automation Specialist. Built with **React 18**, **Vite**, **Tailwind CSS**, Apple/iOS-grade glassmorphism, dynamic multi-theme engine, curated typography switcher, and real-time GitHub repository auto-sync.

---

## 🚀 Quick Start (pnpm)

This project has been migrated to **pnpm** for ultra-fast, space-efficient, and deterministic dependency resolution.

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 8.0.0 (`npm install -g pnpm` or `corepack enable`)

### Installation & Development

```bash
# 1. Install all dependencies with pnpm
pnpm install

# 2. Start local development server
pnpm dev

# 3. Production build
pnpm build

# 4. Preview production build locally
pnpm preview
```
---

## 🎨 Architecture & Design Highlights

- **Package Manager**: Migrated from npm to `pnpm` (`pnpm-lock.yaml`).
- **iOS-Grade Glassmorphism**: Multi-stop linear gradient backgrounds, `backdrop-blur-xl`, 1px specular inner borders, and soft layered ambient shadows.
- **Multi-Theme Engine**: 
  - 🌙 **Deep Dark (Default)**: Midnight slate (`#0B0F19`) with electric blue & emerald accents.
  - ☀️ **Light Mode**: Crisp white/light-gray canvas (`#F8FAFC`) with dark high-contrast text (`#0F172A`).
  - 🖤 **Pure Black Mode**: OLED pitch-black (`#000000`) with stark white text and `#0A0A0A` black glass.
  - ⚡ **Cyberpunk Mode**: Obsidian black (`#05050A`) with electric neon pink (`#FF2A6D`) and cyan (`#05D9E8`) glow.
- **Curated Typography System**:
  - **Modern Sans**: `Inter`, `Plus Jakarta Sans`, `Outfit`
  - **Developer Monospace & Terminal**: `JetBrains Mono`, `Fira Code`, `VT323`, `Share Tech Mono`
- **Dynamic GitHub Sync**: Auto-syncs public repositories for user `SunilKumarKV` tagged with `portfolio`, with 1-hour `localStorage` caching and fallback mock cards.
- **Systems Topology Canvas**: Floating, borderless SVG full-stack network architecture displaying continuous packet flows between central Full-Stack Core and distributed system nodes (React UI, Node API, n8n/Webhooks, Enterprise Ops).

---

## 📂 Project Structure

```
├── public/                 # Static assets & verified resume.pdf
├── src/
│   ├── components/
│   │   ├── layout/         # AuroraBackground, Navbar, SectionDivider
│   │   ├── sections/       # Hero, ProjectsGrid, AnimatedSkills, Experience, Education, Contact
│   │   └── ui/             # HeroGraphic, ThemeSwitcher, FontSwitcher, GlassCard
│   ├── context/            # ThemeContext (Themes & Typography Provider)
│   ├── data/               # portfolioData (Single source of truth)
│   ├── hooks/              # useGitHubProjects, useReducedMotion
│   ├── utils/              # githubSync, formatting
│   ├── App.jsx             # Main application orchestrator
│   ├── index.css           # Global tokens & iOS glassmorphism utilities
│   └── main.jsx            # React root entry
├── package.json
└── pnpm-lock.yaml
```

---

## 📄 License

MIT © [Sunil Kumar K V](https://github.com/SunilKumarKV)
