import React from 'react';

export default function ProjectSkeleton({ isFeatured = false }) {
  return (
    <div className={`ios-glass-card rounded-3xl p-6 animate-pulse space-y-4 ${isFeatured ? 'md:col-span-2' : 'col-span-1'}`}>
      <div className="aspect-video w-full rounded-2xl bg-white/[0.04]" />
      <div className="space-y-2">
        <div className="h-5 w-2/3 bg-white/[0.08] rounded-md" />
        <div className="h-4 w-full bg-white/[0.04] rounded-md" />
        <div className="h-4 w-4/5 bg-white/[0.04] rounded-md" />
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-6 w-16 bg-white/[0.06] rounded-full" />
        <div className="h-6 w-20 bg-white/[0.06] rounded-full" />
        <div className="h-6 w-14 bg-white/[0.06] rounded-full" />
      </div>
    </div>
  );
}
