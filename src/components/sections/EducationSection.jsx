import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BadgeCheck, 
  BookOpen, 
  CheckCircle2, 
  Award,
  Layers,
  Code2,
  ExternalLink
} from 'lucide-react';

/**
 * EducationSection Component
 * Dedicated section for Education & Certifications featuring:
 * - MCA at Bangalore University (Jnana Bharathi Campus, 2025-2027)
 * - BCA at Bangalore North University (2018-2022)
 * - Complete Web Development & JavaScript Bootcamps (Udemy)
 */
export default function EducationSection() {
  const { education, certifications } = portfolioData;

  return (
    <section id="education" className="scroll-mt-28 space-y-10 relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 backdrop-blur-md">
            <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Academic Pedigree & Continuing Education</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Education & Certifications
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Formal computer science foundations in software architecture and algorithms, paired with hands-on full-stack development bootcamps.
          </p>
        </div>

        <span className="glass-pill px-3 py-1.5 text-xs font-mono text-emerald border-emerald/30 hidden md:inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
          Active MCA Student
        </span>
      </div>

      {/* Degree Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => {
          const isPursuing = edu.status.toLowerCase().includes('pursuing');

          return (
            <div
              key={edu.id}
              className="glass-card-hover p-7 rounded-3xl specular-border flex flex-col justify-between space-y-6 bg-slate-900/60 group"
            >
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-mono px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                    isPursuing 
                      ? 'text-emerald bg-emerald/10 border-emerald/30 shadow-sm' 
                      : 'text-slate-300 bg-white/5 border-white/10'
                  }`}>
                    {isPursuing && <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />}
                    {edu.status}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-electric-blue transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-300 mt-1">
                    <span className="text-electric-blue font-semibold">{edu.institution}</span>
                    <span>•</span>
                    <span className="text-slate-400">{edu.campus}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                  {edu.description}
                </p>
              </div>

              {/* Core Focus Areas */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Core Curricular Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {edu.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300 group-hover:border-indigo-500/30 transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Certifications & Bootcamps Container */}
      <div className="glass-panel p-7 sm:p-8 rounded-3xl specular-border space-y-6 bg-slate-900/60">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald/15 border border-emerald/30 flex items-center justify-center">
              <BadgeCheck className="w-4 h-4 text-emerald" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Verified Engineering Bootcamps</h3>
              <p className="text-xs text-slate-400">Targeted full-stack web and language deep dives</p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            Udemy Verified
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald/30 transition-all space-y-3 group/cert"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-bold text-white group-hover/cert:text-emerald transition-colors">
                    {cert.title}
                  </h4>
                  <span className="text-xs font-mono text-slate-400 mt-0.5 block">
                    Issued by <strong className="text-slate-300">{cert.issuer}</strong>
                  </span>
                </div>
                <span className="glass-pill px-2.5 py-0.5 text-[10px] font-mono text-emerald border-emerald/30 flex items-center gap-1 flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-emerald" />
                  Verified
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-slate-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
