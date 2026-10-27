import React from 'react';

/**
 * SectionHeading Component
 * Shared Apple-grade section header with eyebrow pill, high-contrast title,
 * clean subtitle description, and flexible left/center alignment support.
 */
export default function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  tagline,
  subtitle,
  align = 'left',
  action = null,
  className = '',
}) {
  const isCenter = align === 'center';

  return (
    <div
      className={`w-full flex flex-col ${
        isCenter
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between'
      } gap-4 pb-4 border-b border-slate-200/70 dark:border-slate-800/70 ${className}`}
    >
      <div className={`space-y-2.5 ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>
        {eyebrow && (
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono ios-glass border border-[var(--border-glass)] text-[var(--text-secondary)] shadow-sm ${
              isCenter ? 'justify-center' : ''
            }`}
          >
            {EyebrowIcon && (
              <EyebrowIcon className="w-3.5 h-3.5 text-electric-blue flex-shrink-0" />
            )}
            <span>{eyebrow}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
          {title}
          {tagline && (
            <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-indigo-400 to-emerald mt-1">
              {tagline}
            </span>
          )}
        </h2>

        {subtitle && (
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div
          className={`flex items-center gap-3 ${
            isCenter ? 'justify-center mt-2' : 'self-start md:self-end'
          }`}
        >
          {action}
        </div>
      )}
    </div>
  );
}
