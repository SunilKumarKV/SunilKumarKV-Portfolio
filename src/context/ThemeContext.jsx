import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, FONTS } from './themeData';

export { THEMES, FONTS };

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme state with localStorage fallback
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('sunilcraft_theme');
      if (saved && ['dark', 'light', 'pure-black', 'cyberpunk'].includes(saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'dark';
  });

  // Font state with localStorage fallback
  const [fontFamily, setFontFamily] = useState(() => {
    try {
      const saved = localStorage.getItem('sunilcraft_font');
      if (saved && ['inter', 'jakarta', 'outfit', 'jetbrains', 'fira', 'vt323', 'sharetech'].includes(saved)) {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'inter';
  });

  // Apply theme classes and attributes across html and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.classList.remove('theme-dark', 'theme-light', 'theme-pure-black', 'theme-cyberpunk', 'dark');
    body.classList.remove('theme-dark', 'theme-light', 'theme-pure-black', 'theme-cyberpunk', 'dark');

    if (theme === 'light') {
      root.classList.add('theme-light');
      body.classList.add('theme-light');
      root.setAttribute('data-theme', 'light');
      root.style.setProperty('--canvas-bg', '#F8FAFC');
      root.style.setProperty('--canvas-text', '#0F172A');
      root.style.colorScheme = 'light';
    } else if (theme === 'pure-black') {
      root.classList.add('dark', 'theme-pure-black');
      body.classList.add('dark', 'theme-pure-black');
      root.setAttribute('data-theme', 'pure-black');
      root.style.setProperty('--canvas-bg', '#000000');
      root.style.setProperty('--canvas-text', '#FFFFFF');
      root.style.colorScheme = 'dark';
    } else if (theme === 'cyberpunk') {
      root.classList.add('dark', 'theme-cyberpunk');
      body.classList.add('dark', 'theme-cyberpunk');
      root.setAttribute('data-theme', 'cyberpunk');
      root.style.setProperty('--canvas-bg', '#05050A');
      root.style.setProperty('--canvas-text', '#FDFEFE');
      root.style.colorScheme = 'dark';
    } else {
      // Deep Dark Mode (Default)
      root.classList.add('dark', 'theme-dark');
      body.classList.add('dark', 'theme-dark');
      root.setAttribute('data-theme', 'dark');
      root.style.setProperty('--canvas-bg', '#0B0F19');
      root.style.setProperty('--canvas-text', '#F8FAFC');
      root.style.colorScheme = 'dark';
    }

    try {
      localStorage.setItem('sunilcraft_theme', theme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage', e);
    }
  }, [theme]);

  // Apply font family globally across all text
  useEffect(() => {
    const activeFont = FONTS.find((f) => f.id === fontFamily) || FONTS[0];
    const root = document.documentElement;
    const body = document.body;

    root.style.setProperty('--font-primary', activeFont.family);
    root.setAttribute('data-font', fontFamily);
    body.style.fontFamily = activeFont.family;

    try {
      localStorage.setItem('sunilcraft_font', fontFamily);
    } catch (e) {
      console.warn('Unable to persist font to localStorage', e);
    }
  }, [fontFamily]);

  const value = {
    theme,
    setTheme,
    fontFamily,
    setFontFamily,
    themes: THEMES,
    fonts: FONTS,
    activeFont: FONTS.find((f) => f.id === fontFamily) || FONTS[0],
    activeTheme: THEMES.find((t) => t.id === theme) || THEMES[0],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
