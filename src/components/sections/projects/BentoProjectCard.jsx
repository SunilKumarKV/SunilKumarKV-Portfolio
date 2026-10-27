import React, { useState, useRef } from 'react';
import { ExternalLink, Github, Star, GitFork, Sparkles, Layers } from 'lucide-react';

export default function BentoProjectCard({ project, isFeatured = false }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: -((e.clientY - rect.top - centerY) / centerY) * 6,
      y: ((e.clientX - rect.left - centerX) / centerX) * 6,
    });
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const githubUrl = project.githubUrl || project.github;
  const liveDemoUrl = project.liveDemoUrl || project.liveDemo;
  const updatedAt = project.updatedAt || project.updated || 'Recent';
  const badgeText = project.badge || (isFeatured ? 'Featured Product' : null);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotate({ x: 0, y: 0 }); }}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotate.x.toFixed(2)}deg) rotateY(${rotate.y.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
      }}
      className={`group relative rounded-3xl p-6 transition-all duration-300 overflow-hidden flex flex-col justify-between ios-glass-card ${
        isFeatured ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
      }`}
    >
      {/* Cursor-Proximity Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.14), transparent 70%)`,
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* 16:9 Preview */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950/80 border border-[var(--border-glass)]">
          {!imgError ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-400 space-y-2">
              <Layers className="w-8 h-8 text-electric-blue/70" />
              <span className="text-xs font-mono">{project.title}</span>
            </div>
          )}
          
          {badgeText && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-electric-blue/90 text-white backdrop-blur-md shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{badgeText}</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-electric-blue transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
              {project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  {project.stars}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {project.forks}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/[0.04] border border-[var(--border-glass)] text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="relative z-10 pt-5 mt-4 border-t border-[var(--border-glass)] flex items-center justify-between">
        <span className="text-[11px] font-mono text-[var(--text-secondary)]">
          Updated {updatedAt}
        </span>
        <div className="flex items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              aria-label="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {liveDemoUrl && (
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-electric-blue hover:bg-blue-500 text-white shadow-sm transition-all"
              aria-label="Live Demo"
            >
              <span>Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
