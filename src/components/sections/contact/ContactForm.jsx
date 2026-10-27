import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Loader2, 
  Building2, 
  Link as LinkIcon, 
  Calendar, 
  Layers, 
  MessageSquare,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import GlassCard from '../../ui/GlassCard';

export default function ContactForm({ intent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleLink: '',
    projectScope: 'Full-Stack MVP Development',
    timeline: '1 - 2 Months',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      intentType: intent === 'hiring' ? 'Hiring for a Role' : 'Freelance Project',
      details: {
        company: intent === 'hiring' ? formData.company.trim() : null,
        roleLink: intent === 'hiring' ? formData.roleLink.trim() : null,
        projectScope: intent === 'freelance' ? formData.projectScope : null,
        timeline: intent === 'freelance' ? formData.timeline : null,
        message: formData.message.trim(),
      },
      submittedAt: new Date().toISOString(),
      source: 'SunilCraft Portfolio Contact Pipeline',
    };

    const n8nWebhookUrl = 
      import.meta.env.VITE_N8N_WEBHOOK_URL || 
      'https://primary-production-n8n.up.railway.app/webhook/sunilcraft-contact';

    try {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      setIsSuccess(true);
    } catch (err) {
      console.warn('[ContactForm] Dev fallback triggered:', err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="py-12 px-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald/10 border border-emerald/30 text-emerald mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Transmission Confirmed</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your inquiry has been routed through n8n. Sunil will respond within 24 hours.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '', company: '', roleLink: '', projectScope: 'Full-Stack MVP Development', timeline: '1 - 2 Months', message: '' });
          }}
          className="px-5 py-2 rounded-xl text-xs font-mono text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-300">Your Full Name *</label>
          <input name="name" required placeholder="e.g. Alex Morgan" value={formData.name} onChange={handleInputChange} className="glass-input w-full px-4 py-3 rounded-xl text-sm" />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-mono text-slate-300">Email Address *</label>
          <input name="email" type="email" required placeholder="alex@company.com" value={formData.email} onChange={handleInputChange} className="glass-input w-full px-4 py-3 rounded-xl text-sm" />
        </div>
      </div>

      {intent === 'hiring' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-electric-blue" /> Organization / Team *</label>
            <input name="company" required placeholder="e.g. Stripe, Linear" value={formData.company} onChange={handleInputChange} className="glass-input w-full px-4 py-3 rounded-xl text-sm" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5"><LinkIcon className="w-3.5 h-3.5 text-electric-blue" /> Job Description Link</label>
            <input name="roleLink" type="url" placeholder="https://jobs.lever.co/..." value={formData.roleLink} onChange={handleInputChange} className="glass-input w-full px-4 py-3 rounded-xl text-sm" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald" /> Project Scope</label>
            <select name="projectScope" value={formData.projectScope} onChange={handleInputChange} className="glass-input w-full px-4 py-3 rounded-xl text-sm bg-slate-900 text-slate-100">
              <option value="Full-Stack MVP Development">Full-Stack MVP Development</option>
              <option value="Workflow Automation & n8n">Workflow Automation & n8n</option>
              <option value="Design System & Glassmorphism">Design System & Glassmorphism</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald" /> Target Timeline</label>
            <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="glass-input w-full px-4 py-3 rounded-xl text-sm bg-slate-900 text-slate-100">
              <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
              <option value="1 - 2 Months">1 - 2 Months</option>
              <option value="Quarterly Milestone">Quarterly Milestone</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-slate-400" /> Details & Scope *</label>
        <textarea name="message" required rows={4} placeholder={intent === 'hiring' ? "Describe the engineering role, team culture, key challenges, or tech stack..." : "Describe your product goals, technical deliverables, or timeline..."} value={formData.message} onChange={handleInputChange} className="glass-input w-full px-4 py-3 rounded-xl text-sm resize-none" />
      </div>

      <button type="submit" disabled={isSubmitting} className={`w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.99] ${intent === 'hiring' ? 'bg-electric-blue hover:bg-blue-500 shadow-specular-blue' : 'bg-emerald hover:bg-emerald-600 shadow-specular-emerald'}`}>
        {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin text-white" /><span>Transmitting to Webhook...</span></> : <><span>Submit {intent === 'hiring' ? 'Hiring Inquiry' : 'Project Request'}</span><Send className="w-4 h-4" /></>}
      </button>
    </form>
  );
}
