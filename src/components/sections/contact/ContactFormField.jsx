import React from 'react';

/**
 * ContactFormField Component
 * Accessible, reusable form field component with integrated error messaging and iOS glass styling.
 */
export default function ContactFormField({
  id,
  name,
  label,
  type = 'text',
  isTextarea = false,
  rows = 4,
  required = true,
  placeholder,
  value,
  onChange,
  disabled = false,
  maxLength,
  error,
  icon: Icon,
  iconClass = '',
}) {
  const baseInputClass = `w-full px-4 py-3 rounded-xl text-sm ios-glass border ${
    error
      ? 'border-rose-500/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50'
      : 'border-[var(--border-glass)] focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50'
  } text-[var(--text-primary)] placeholder:text-slate-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
        {Icon && <Icon className={`w-3.5 h-3.5 ${iconClass}`} />}
        <span>{label}</span>
        {required && <span className="text-rose-400">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          maxLength={maxLength}
          disabled={disabled}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${baseInputClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={baseInputClass}
        />
      )}

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-rose-400 font-mono animate-in fade-in">
          {error}
        </p>
      )}
    </div>
  );
}
