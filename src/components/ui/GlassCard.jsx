import React from 'react';

/**
 * GlassCard Component
 * Apple / iOS-Grade Liquid Frosted Glass surface.
 * Features:
 * - Ultra-refined backdrop-blur-xl and saturation boost
 * - Subtle multi-stop linear gradient tint
 * - Precise 1px specular inner highlight border
 * - Layered ambient drop shadows
 * - Adaptive tint across all 4 themes
 */
export default function GlassCard({
  children,
  className = '',
  hoverEffect = false,
  as: Component = 'div',
  ...props
}) {
  return (
    <Component
      className={`ios-glass-card rounded-2xl sm:rounded-3xl transition-all duration-300 ${
        hoverEffect ? 'hover:scale-[1.01] hover:shadow-2xl' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
