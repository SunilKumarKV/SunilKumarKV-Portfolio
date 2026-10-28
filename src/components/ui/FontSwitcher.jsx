import React, { useState, useRef, useEffect } from 'react';
import { Type, Check, ChevronDown, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * FontSwitcher Component
 * Dropdown allowing visitors to dynamically switch the entire site's typography
 * between top developer monospace/terminal and modern geometric/sans-serif options.
 */
export default function FontSwitcher() {
  const { fontFamily, setFontFamily, fonts, activeFont } = useTheme();
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

  const sansFonts = fonts.filter((f) => !f.isTerminal);
  const terminalFonts = fonts.filter((f) => f.isTerminal);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch typography font family"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-200 focus:outline-none"
      >
        {activeFont.isTerminal ? (
          <Terminal className="w-3.5 h-3.5 text-emerald" />
        ) : (
          <Type className="w-3.5 h-3.5 text-electric-blue" />
        )}
        <span className="hidden sm:inline-block font-medium">
          {activeFont.name}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto rounded-2xl p-2 bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-white/10 mb-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Site-Wide Typography
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Choose Typography Style
            </div>
          </div>

          {/* Section 1: Modern Sans-Serif */}
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-electric-blue/80">
            Modern & Clean
          </div>
          <div className="space-y-1 mb-2">
            {sansFonts.map((f) => {
              const isSelected = f.id === fontFamily;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFontFamily(f.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 text-left ${
                    isSelected
                      ? 'bg-electric-blue/15 text-white border border-electric-blue/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: f.family }}
                >
                  <div>
                    <div className="font-semibold text-sm leading-tight">{f.name}</div>
                    <div className="text-[10px] opacity-70 font-sans">{f.tag}</div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-electric-blue flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Section 2: Developer Terminal & Monospace */}
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-emerald flex items-center gap-1.5 border-t border-white/10 pt-2">
            <Terminal className="w-3 h-3 text-emerald" />
            <span>Developer Terminal & Monospace</span>
          </div>
          <div className="space-y-1">
            {terminalFonts.map((f) => {
              const isSelected = f.id === fontFamily;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setFontFamily(f.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 text-left ${
                    isSelected
                      ? 'bg-emerald/15 text-white border border-emerald/30 font-semibold shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: f.family }}
                >
                  <div>
                    <div className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                      <span>{f.name}</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-emerald/10 text-emerald font-mono">
                        TERMINAL
                      </span>
                    </div>
                    <div className="text-[10px] opacity-70 font-sans">{f.tag}</div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald flex-shrink-0 ml-2" />
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
