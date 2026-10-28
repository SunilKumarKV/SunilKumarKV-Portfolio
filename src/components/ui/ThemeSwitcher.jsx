import React, { useState, useRef, useEffect } from 'react';
import { Moon, Sun, Zap, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * ThemeSwitcher Component
 * Allows visitors to switch between:
 * - "Dark" (Default slate-950 #0B0F19, electric blue & emerald)
 * - "Light" (Clean crisp white/slate-50 canvas, high contrast dark text)
 * - "Cyberpunk" (Deep obsidian/neon black #05050A, neon pink & cyan)
 */
export default function ThemeSwitcher() {
  const { theme, setTheme, themes, activeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (themeId) => {
    switch (themeId) {
      case 'light':
        return <Sun className="w-3.5 h-3.5 text-amber-400" />;
      case 'pure-black':
        return (
          <span className="w-3.5 h-3.5 rounded-full bg-black border border-white flex items-center justify-center text-[8px] font-black text-white">
            ●
          </span>
        );
      case 'cyberpunk':
        return <Zap className="w-3.5 h-3.5 text-[#FF2A6D]" />;
      default:
        return <Moon className="w-3.5 h-3.5 text-electric-blue" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch site color theme"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-200 focus:outline-none"
      >
        {getThemeIcon(theme)}
        <span className="hidden sm:inline-block font-sans font-medium">
          {activeTheme.name}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-2xl p-1.5 bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-white/10 mb-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Visual Atmosphere
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Choose Color Theme
            </div>
          </div>

          <div className="space-y-1">
            {themes.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all duration-150 text-left ${
                    isSelected
                      ? 'bg-white/10 text-white border border-white/20 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className="w-3 h-3 rounded-full flex-shrink-0 border border-white/20"
                      style={{ backgroundColor: t.colorHex }}
                    />
                    <div>
                      <div className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                        <span>{t.name}</span>
                        {t.id === 'cyberpunk' && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#FF2A6D]/20 text-[#FF2A6D] font-mono">
                            NEON
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans mt-0.5 leading-tight line-clamp-1">
                        {t.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-electric-blue flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
