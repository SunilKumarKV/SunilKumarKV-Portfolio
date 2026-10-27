/**
 * Theme & Font Definitions for SunilCraft Portfolio Multi-Theme Engine
 */

export const THEMES = [
  {
    id: 'dark',
    name: 'Deep Dark',
    tag: 'Midnight Slate (Default)',
    description: 'Rich midnight slate (#0B0F19) with electric blue & emerald accents',
    colorHex: '#3B82F6',
    secondaryHex: '#10B981',
    bgHex: '#0B0F19',
    cardHex: '#111827',
  },
  {
    id: 'light',
    name: 'Light Mode',
    tag: 'Crisp & Modern',
    description: 'Crisp white/slate-50 canvas (#F8FAFC) with dark high-contrast text (#0F172A)',
    colorHex: '#2563EB',
    secondaryHex: '#059669',
    bgHex: '#F8FAFC',
    cardHex: '#FFFFFF',
  },
  {
    id: 'pure-black',
    name: 'Pure Black',
    tag: 'OLED Pitch-Black',
    description: 'Deep pitch-black (#000000) with stark white text and true black glass (#0A0A0A)',
    colorHex: '#E2E8F0',
    secondaryHex: '#38BDF8',
    bgHex: '#000000',
    cardHex: '#0A0A0A',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    tag: 'Obsidian Neon',
    description: 'Obsidian black/neon slate (#05050A) with electric neon pink & cyan accents',
    colorHex: '#FF2A6D',
    secondaryHex: '#05D9E8',
    bgHex: '#05050A',
    cardHex: '#0D0A1A',
  },
];

export const FONTS = [
  // Modern Sans-Serif Typography
  {
    id: 'inter',
    name: 'Inter',
    category: 'Sans-Serif',
    tag: 'Clean & Professional',
    family: "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sample: 'Aa (Inter)',
    isTerminal: false,
  },
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans',
    category: 'Sans-Serif',
    tag: 'Modern & Geometric',
    family: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sample: 'Aa (Jakarta)',
    isTerminal: false,
  },
  {
    id: 'outfit',
    name: 'Outfit',
    category: 'Sans-Serif',
    tag: 'Sleek & Rounded',
    family: "'Outfit', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sample: 'Aa (Outfit)',
    isTerminal: false,
  },
  // Developer Monospace & Terminal Typography
  {
    id: 'jetbrains',
    name: 'JetBrains Mono',
    category: 'Monospace',
    tag: 'Clean Developer Monospace',
    family: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    sample: 'const code = true;',
    isTerminal: true,
  },
  {
    id: 'fira',
    name: 'Fira Code',
    category: 'Monospace',
    tag: 'Programming Monospace with Ligatures',
    family: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    sample: 'fn() => void;',
    isTerminal: true,
  },
  {
    id: 'vt323',
    name: 'VT323',
    category: 'Terminal',
    tag: 'Retro CRT Terminal Font',
    family: "'VT323', ui-monospace, monospace",
    sample: 'SYSTEM READY >_',
    isTerminal: true,
  },
  {
    id: 'sharetech',
    name: 'Share Tech Mono',
    category: 'Terminal',
    tag: 'Futuristic Sci-Fi Terminal Style',
    family: "'Share Tech Mono', ui-monospace, monospace",
    sample: '[SYS_STATUS: OK]',
    isTerminal: true,
  },
];
