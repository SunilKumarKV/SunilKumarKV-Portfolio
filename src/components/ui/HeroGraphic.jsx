import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { NODES, CHANNELS } from './hero-graphic/heroGraphicData';
import NodeGlyph from './hero-graphic/NodeGlyph';

export default function HeroGraphic() {
  const { theme } = useTheme();
  const graphicRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState('core');
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', handleChange);
    return () => mediaQuery.removeEventListener?.('change', handleChange);
  }, []);

  const handleMouseMove = (e) => {
    if (!graphicRef.current || isReducedMotion) return;
    const rect = graphicRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: -((e.clientY - rect.top - centerY) / centerY) * 5,
      y: ((e.clientX - rect.left - centerX) / centerX) * 5,
    });
  };

  const activeNode = NODES.find((n) => n.id === (hoveredNodeId || selectedNodeId)) || NODES[0];

  const getColors = () => {
    if (theme === 'pure-black') {
      return { core: '#FFFFFF', react: '#38BDF8', node: '#E2E8F0', n8n: '#38BDF8', sap: '#94A3B8', lines: 'rgba(255, 255, 255, 0.22)', textPrimary: '#FFFFFF', textMuted: '#CBD5E1' };
    }
    if (theme === 'cyberpunk') {
      return { core: '#FF2A6D', react: '#05D9E8', node: '#9B5DE5', n8n: '#FF2A6D', sap: '#05D9E8', lines: 'rgba(255, 42, 109, 0.25)', textPrimary: '#FFFFFF', textMuted: '#CBD5E1' };
    }
    if (theme === 'light') {
      return { core: '#2563EB', react: '#0284C7', node: '#059669', n8n: '#EA580C', sap: '#2563EB', lines: 'rgba(15, 23, 42, 0.15)', textPrimary: '#0F172A', textMuted: '#475569' };
    }
    return { core: '#6366F1', react: '#61DAFB', node: '#22C55E', n8n: '#F97316', sap: '#0284C7', lines: 'rgba(255, 255, 255, 0.15)', textPrimary: '#FFFFFF', textMuted: '#94A3B8' };
  };

  const colors = getColors();

  return (
    <div 
      className="relative w-full max-w-lg mx-auto select-none perspective-[1000px]"
      ref={graphicRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotate({ x: 0, y: 0 }); setHoveredNodeId(null); }}
    >
      <div
        style={{
          transform: isReducedMotion ? 'none' : `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
        className="w-full relative transition-transform duration-300"
      >
        <div className="absolute inset-0 rounded-full blur-[100px] opacity-25 pointer-events-none transition-colors duration-500" style={{ background: colors.core, transform: 'scale(0.85)' }} />

        <div className="w-full aspect-[540/420] relative">
          <svg viewBox="0 0 540 420" className="w-full h-full filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <defs>
              <radialGradient id="coreRadialSeamless" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={colors.core} stopOpacity="0.45" />
                <stop offset="60%" stopColor={colors.core} stopOpacity="0.12" />
                <stop offset="100%" stopColor={colors.core} stopOpacity="0" />
              </radialGradient>
              <filter id="packetGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <circle cx="270" cy="210" r="160" fill="url(#coreRadialSeamless)" />
            <circle cx="270" cy="210" r="150" fill="none" stroke={colors.lines} strokeDasharray="3 6" strokeWidth="1" />
            <circle cx="270" cy="210" r="95" fill="none" stroke={colors.lines} strokeDasharray="4 8" strokeWidth="1" />

            {CHANNELS.map((chan) => {
              const isHL = hoveredNodeId === chan.from || hoveredNodeId === chan.to;
              const chCol = (chan.from === 'react-ui' || chan.to === 'react-ui') ? colors.react : (chan.from === 'node-api' || chan.to === 'node-api') ? colors.node : (chan.from === 'n8n-webhooks' || chan.to === 'n8n-webhooks') ? colors.n8n : colors.sap;
              return (
                <g key={chan.id}>
                  <path d={chan.path} fill="none" stroke={isHL ? chCol : colors.lines} strokeWidth={isHL ? '2.5' : '1.5'} />
                  {!isReducedMotion && <path d={chan.path} fill="none" stroke={chCol} strokeWidth={isHL ? '2.8' : '1.8'} strokeDasharray="6 18" opacity={isHL ? 0.95 : 0.5} className="animate-dash-stream" />}
                  {!isReducedMotion && (
                    <g>
                      <circle r="4" fill={chCol} filter="url(#packetGlowFilter)"><animateMotion path={chan.path} dur={chan.speed} begin={chan.delay} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" /></circle>
                      <circle r="1.8" fill="#FFF"><animateMotion path={chan.path} dur={chan.speed} begin={chan.delay} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" /></circle>
                    </g>
                  )}
                  {!isReducedMotion && chan.reverseSpeed && (
                    <circle r="2.8" fill="#FFF" opacity="0.85"><animateMotion path={chan.path} dur={chan.reverseSpeed} begin={chan.reverseDelay} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" /></circle>
                  )}
                </g>
              );
            })}

            {NODES.filter((n) => n.id !== 'core').map((node) => {
              const isH = hoveredNodeId === node.id || selectedNodeId === node.id;
              const nCol = node.id === 'react-ui' ? colors.react : node.id === 'node-api' ? colors.node : node.id === 'n8n-webhooks' ? colors.n8n : colors.sap;
              return (
                <g key={node.id} transform={`translate(${node.coords.x}, ${node.coords.y})`} className="cursor-pointer" onMouseEnter={() => { setHoveredNodeId(node.id); setSelectedNodeId(node.id); }} onMouseLeave={() => setHoveredNodeId(null)} onClick={() => setSelectedNodeId(node.id)}>
                  <circle r={isH ? 36 : 28} fill={nCol} opacity={isH ? 0.28 : 0.14} className="transition-all duration-300" />
                  <circle r="24" fill={theme === 'light' ? '#FFFFFF' : theme === 'pure-black' ? '#0A0A0A' : '#111827'} stroke={isH ? nCol : colors.lines} strokeWidth={isH ? '2.5' : '1.5'} filter="url(#packetGlowFilter)" />
                  <NodeGlyph nodeId={node.id} color={nCol} />
                  <text y="38" textAnchor="middle" fill={colors.textPrimary} fontSize="12" fontWeight="700" fontFamily="monospace" className="pointer-events-none drop-shadow">{node.name}</text>
                  <text y="50" textAnchor="middle" fill={isH ? nCol : colors.textMuted} fontSize="9.5" fontFamily="sans-serif" fontWeight="600" className="pointer-events-none">{node.badge}</text>
                </g>
              );
            })}

            <g transform="translate(270, 210)" className="cursor-pointer" onMouseEnter={() => { setHoveredNodeId('core'); setSelectedNodeId('core'); }} onMouseLeave={() => setHoveredNodeId(null)} onClick={() => setSelectedNodeId('core')}>
              <circle r="52" fill={colors.core} opacity="0.18" className={!isReducedMotion ? 'animate-core-pulse' : ''} />
              <g className={!isReducedMotion ? 'animate-spin-atom' : ''} style={{ transformOrigin: '0 0' }}>
                <ellipse rx="42" ry="17" fill="none" stroke={colors.react} strokeWidth="1.6" strokeDasharray="4 4" opacity="0.85" />
                <ellipse rx="42" ry="17" fill="none" stroke={colors.core} strokeWidth="1.6" strokeDasharray="4 4" opacity="0.85" transform="rotate(60)" />
                <ellipse rx="42" ry="17" fill="none" stroke={colors.node} strokeWidth="1.6" strokeDasharray="4 4" opacity="0.85" transform="rotate(120)" />
              </g>
              <circle r="24" fill={theme === 'light' ? '#FFFFFF' : theme === 'pure-black' ? '#0A0A0A' : '#0F172A'} stroke={colors.core} strokeWidth="2.5" filter="url(#packetGlowFilter)" />
              <circle r="13" fill={colors.core} />
              <circle r="4.5" fill="#FFFFFF" />
              <text y="64" textAnchor="middle" fill={colors.textPrimary} fontSize="13" fontWeight="800" fontFamily="monospace" letterSpacing="0.04em" className="drop-shadow">Full-Stack Core</text>
              <text y="77" textAnchor="middle" fill={colors.core} fontSize="9.5" fontFamily="sans-serif" fontWeight="700">Systems & Automation</text>
            </g>
          </svg>
        </div>

        <div className="mt-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: activeNode.color, boxShadow: `0 0 8px ${activeNode.color}` }} />
            <span className="font-mono font-bold text-white text-xs">{activeNode.name}</span>
            <span className="text-[11px] text-slate-400 font-sans hidden sm:inline">— {activeNode.role}</span>
          </div>
          <div className="text-[11px] font-mono font-semibold text-emerald">{activeNode.throughput}</div>
        </div>
      </div>
    </div>
  );
}
