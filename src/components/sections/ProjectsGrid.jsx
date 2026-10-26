import React, { useState, useRef } from 'react';
import { useGitHubProjects } from '../../hooks/useGitHubProjects';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Star, 
  GitFork, 
  RotateCw, 
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';

/**
 * BentoProjectCard
 * Tier 2 frosted glass card with 16:9 preview image, monospace tech stack pills,
 * 3D card tilt and cursor-proximity radial spotlight effect.
 */
function BentoProjectCard({ project, isFeatured = false }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-6deg to +6deg for smooth subtle 3D tilt)
    const rotateX = -((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
        willChange: 'transform',
      }}
      className={`group relative rounded-3xl p-6 transition-all duration-300 overflow-hidden flex flex-col justify-between
        bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-white/20 shadow-glass
        ${isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
      `}
    >
      {/* 1. Cursor-Proximity Radial Spotlight Fill */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Cursor-Proximity Specular Border Shine */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          padding: '1px',
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.3) 0%, rgba(59, 130, 246, 0.4) 40%, transparent 80%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
        aria-hidden="true"
      />

      {/* Card Content Container */}
      <div className="relative z-10 space-y-5">
        
        {/* 16:9 Aspect Ratio Preview Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-white/5 group/img">
          {!imgError ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} Preview`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-105"
            />
          ) : (
            /* Fallback Aesthetic Graphic if external image fails */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
              <div className="absolute inset-0 architectural-grid opacity-40 pointer-events-none" />
              <div className="w-12 h-12 rounded-xl bg-electric-blue/15 border border-electric-blue/30 flex items-center justify-center mb-2 shadow-specular-blue">
                <FolderGit2 className="w-6 h-6 text-electric-blue" />
              </div>
              <span className="font-bold text-white tracking-tight text-center">{project.title}</span>
              <span className="font-mono text-[11px] text-slate-400 mt-1">{project.name}</span>
            </div>
          )}

          {/* Image Gradient Tint & Highlights */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

          {/* Live Status Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {project.liveDemo && (
              <span className="glass-pill px-2.5 py-1 text-[11px] font-mono text-emerald bg-slate-950/80 border-emerald/30 shadow-sm flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                Live Demo
              </span>
            )}
            {isFeatured && (
              <span className="glass-pill px-2.5 py-1 text-[11px] font-mono text-electric-blue bg-slate-950/80 border-electric-blue/30 shadow-sm flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-electric-blue" />
                Featured
              </span>
            )}
          </div>

          {/* Star & Fork Counters */}
          {(project.stars > 0 || project.forks > 0) && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              {project.stars > 0 && (
                <span className="glass-pill px-2.5 py-1 text-[11px] font-mono text-amber-300 bg-slate-950/80 border-amber-300/30 flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3 h-3 fill-amber-300" />
                  {project.stars}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-electric-blue transition-colors duration-200 tracking-tight">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
              {project.updated}
            </span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Monospace Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 group-hover:border-electric-blue/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>

      {/* Card Footer: Action Links */}
      <div className="relative z-10 pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
        >
          <Github className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
          <span>Source Code</span>
        </a>

        {project.liveDemo ? (
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-electric-blue/90 hover:bg-electric-blue px-3.5 py-1.5 rounded-lg shadow-specular-blue transition-all active:scale-95"
          >
            <span>Launch</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span className="text-xs font-mono text-slate-500 italic px-2">
            Internal / Docs
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Skeleton Loader matching Bento shape
 */
function BentoSkeletonCard({ isFeatured = false }) {
  return (
    <div
      className={`rounded-3xl p-6 bg-slate-900/40 backdrop-blur-md border border-white/5 animate-pulse flex flex-col justify-between space-y-5
        ${isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
      `}
    >
      <div className="space-y-4">
        {/* 16:9 Image Placeholder */}
        <div className="aspect-video w-full rounded-2xl bg-white/[0.04] border border-white/5" />
        
        {/* Title Bar */}
        <div className="h-6 w-3/4 rounded-lg bg-white/10" />
        
        {/* Description Lines */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-white/[0.05]" />
          <div className="h-4 w-5/6 rounded bg-white/[0.05]" />
        </div>

        {/* Tech Pills */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-md bg-white/[0.06]" />
          <div className="h-6 w-20 rounded-md bg-white/[0.06]" />
          <div className="h-6 w-14 rounded-md bg-white/[0.06]" />
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-white/5 flex justify-between">
        <div className="h-7 w-24 rounded bg-white/[0.05]" />
        <div className="h-7 w-20 rounded bg-white/10" />
      </div>
    </div>
  );
}

/**
 * ProjectsGrid Section Component
 * Fetches synced repositories via useGitHubProjects and renders an asymmetric
 * bento grid with 3D tilt and cursor-proximity spotlights.
 */
export default function ProjectsGrid() {
  const { projects, isLoading, isFallback, fromCache, error, refetch } = useGitHubProjects();

  return (
    <section id="work" className="scroll-mt-28 space-y-8 relative z-10">
      <div id="projects" className="absolute -top-28 pointer-events-none" />
      
      {/* Section Header with Sync Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-electric-blue/10 border border-electric-blue/20 text-electric-blue">
            <Layers className="w-3.5 h-3.5 text-electric-blue" />
            <span>GitHub Sync & Portfolio Bento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered Works & Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Live auto-synced repositories filtered by <span className="font-mono text-electric-blue">portfolio</span> topic tag, cached and rendered with interactive glassmorphism.
          </p>
        </div>

        {/* Sync Status Badge & Refresh Control */}
        <div className="flex items-center gap-3">
          <div 
            className="glass-pill px-3 py-1.5 text-xs font-mono flex items-center gap-2 bg-slate-950/70 border-white/10"
            title={fromCache ? 'Loaded from 1-hour localStorage cache' : 'Live from GitHub API'}
          >
            <span 
              className={`w-2 h-2 rounded-full ${
                isFallback ? 'bg-amber-400' : 'bg-emerald'
              } ${isLoading ? 'animate-spin' : 'animate-pulse'}`} 
            />
            <span className="text-slate-300">
              {isLoading 
                ? 'Syncing...' 
                : isFallback 
                  ? 'Fallback Portfolio' 
                  : fromCache 
                    ? 'Cached (1h TTL)' 
                    : 'GitHub Synced'}
            </span>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            aria-label="Refresh GitHub repositories"
            title="Force refresh GitHub sync"
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-electric-blue' : ''}`} />
          </button>
        </div>
      </div>

      {/* Error / Rate limit Notice Banner if present */}
      {error && !isLoading && (
        <div className="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-mono flex items-center justify-between">
          <span>{error}</span>
          <span className="text-amber-400 text-[11px] underline cursor-pointer" onClick={() => refetch()}>
            Retry
          </span>
        </div>
      )}

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            <BentoSkeletonCard isFeatured={true} />
            <BentoSkeletonCard isFeatured={false} />
            <BentoSkeletonCard isFeatured={false} />
            <BentoSkeletonCard isFeatured={true} />
          </>
        ) : (
          projects.map((project, idx) => {
            // Asymmetric pattern: 1st project and 4th project span 2 columns
            const isFeatured = idx === 0 || idx === 3;
            return (
              <BentoProjectCard
                key={project.id}
                project={project}
                isFeatured={isFeatured}
              />
            );
          })
        )}
      </div>

    </section>
  );
}
