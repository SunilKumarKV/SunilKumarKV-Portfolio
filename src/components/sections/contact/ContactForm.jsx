import React, { useState } from 'react';
import { Send, Loader2, Building2, Layers, MessageSquare, AlertCircle } from 'lucide-react';
import ContactSuccessState from './ContactSuccessState';

/**
 * ContactForm Component
 * Dual-intent contact form wired to n8n webhook with iOS-grade glass styling.
 */
export default function ContactForm({ intent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyOrScope: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      intent,
      name: formData.name.trim(),
      email: formData.email.trim(),
      companyOrScope: formData.companyOrScope.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
    };

    const webhookUrl = 
      import.meta.env.VITE_N8N_WEBHOOK_URL || 
      'https://primary-production-n8n.up.railway.app/webhook/sunilcraft-contact';

    try {
      if (!import.meta.env.VITE_N8N_WEBHOOK_URL) {
        console.warn('[ContactForm] VITE_N8N_WEBHOOK_URL not configured. Dispatching payload:', payload);
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok && response.status !== 0) {
        throw new Error(`Webhook responded with status: ${response.status}`);
      }

      setIsSuccess(true);
    } catch (err) {
      console.warn('[ContactForm] Webhook call encountered an issue:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMsg(null);
    setFormData({ name: '', email: '', companyOrScope: '', message: '' });
  };

  if (isSuccess) {
    return <ContactSuccessState name={formData.name} onReset={handleReset} />;
  }

  const isHiring = intent === 'hiring';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Name & Email Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[var(--text-secondary)] block">Your Name *</label>
          <input
            name="name"
            type="text"
            required
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl text-sm ios-glass border border-[var(--border-glass)] text-[var(--text-primary)] placeholder:text-slate-500 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono text-[var(--text-secondary)] block">Email Address *</label>
          <input
            name="email"
            type="email"
            required
            placeholder="alex@company.com"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl text-sm ios-glass border border-[var(--border-glass)] text-[var(--text-primary)] placeholder:text-slate-500 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all"
          />
        </div>
      </div>

      {/* Conditional Field: Company vs Project Scope */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
          {isHiring ? <Building2 className="w-3.5 h-3.5 text-electric-blue" /> : <Layers className="w-3.5 h-3.5 text-emerald" />}
          <span>{isHiring ? 'Company / Organization *' : 'Project Type / Scope *'}</span>
        </label>
        <input
          name="companyOrScope"
          type="text"
          required
          placeholder={isHiring ? 'e.g. Stripe, Linear, Early-Stage Startup' : 'e.g. Full-Stack MVP, React App, Automation Pipeline'}
          value={formData.companyOrScope}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl text-sm ios-glass border border-[var(--border-glass)] text-[var(--text-primary)] placeholder:text-slate-500 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all"
        />
      </div>

      {/* Message Textarea */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          <span>Message / Requirements *</span>
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={isHiring ? 'Tell me about the engineering role, team culture, key challenges, or tech stack...' : 'Describe your product goals, technical deliverables, or expected timeline...'}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl text-sm ios-glass border border-[var(--border-glass)] text-[var(--text-primary)] placeholder:text-slate-500 focus:outline-none focus:border-electric-blue/50 focus:ring-1 focus:ring-electric-blue/50 transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-lg ${
          isHiring ? 'bg-electric-blue hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-emerald hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Transmitting to Webhook...</span>
          </>
        ) : (
          <>
            <span>Submit {isHiring ? 'Hiring Inquiry' : 'Project Request'}</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
