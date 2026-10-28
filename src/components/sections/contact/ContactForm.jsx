import React, { useState, useRef } from 'react';
import { Send, Loader2, Building2, Layers, MessageSquare, AlertCircle } from 'lucide-react';
import ContactSuccessState from './ContactSuccessState';
import ContactFormField from './ContactFormField';
import { validateContactForm, FIELD_LIMITS } from '../../../utils/contactValidation';
import { sendContactSubmission } from '../../../utils/contactWebhook';

const INITIAL_FORM = { name: '', email: '', companyOrScope: '', message: '', _honeypot: '' };

/**
 * ContactForm Component
 * Dual-intent contact form wired to n8n webhook with iOS glass styling,
 * resilient validation, error recovery, honeypot spam protection, and a11y.
 */
export default function ContactForm({ intent }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM);
  const isSubmittingRef = useRef(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (generalError) setGeneralError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;

    if (formData._honeypot && formData._honeypot.trim().length > 0) {
      setIsSuccess(true);
      return;
    }

    const { isValid, errors: validationErrors, sanitized } = validateContactForm(formData, intent);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setGeneralError(null);
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    const payload = {
      intent,
      name: sanitized.name,
      email: sanitized.email,
      companyOrScope: sanitized.companyOrScope,
      message: sanitized.message,
      timestamp: new Date().toISOString(),
    };

    try {
      await sendContactSubmission(payload);
      setIsSuccess(true);
    } catch (err) {
      setGeneralError(err.message || 'Unable to submit message. Please try again or reach out directly.');
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setGeneralError(null);
    setErrors({});
    setFormData(INITIAL_FORM);
  };

  if (isSuccess) {
    return <ContactSuccessState name={formData.name.trim()} onReset={handleReset} />;
  }

  const isHiring = intent === 'hiring';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Invisible Honeypot Anti-Spam Field */}
      <input
        type="text"
        name="_honeypot"
        id="contact-honeypot"
        value={formData._honeypot}
        onChange={handleInputChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {/* Global Error Banner */}
      {generalError && (
        <div role="alert" aria-live="assertive" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold">Transmission Failed</p>
            <p className="text-red-300/90 leading-relaxed">{generalError}</p>
          </div>
        </div>
      )}

      {/* Name & Email Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ContactFormField
          id="contact-name"
          name="name"
          label="Your Name"
          type="text"
          placeholder="e.g. Alex Morgan"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          maxLength={FIELD_LIMITS.name.max}
          disabled={isSubmitting}
        />

        <ContactFormField
          id="contact-email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="alex@company.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          maxLength={FIELD_LIMITS.email.max}
          disabled={isSubmitting}
        />
      </div>

      {/* Conditional Field: Company vs Project Scope */}
      <ContactFormField
        id="contact-company-scope"
        name="companyOrScope"
        label={isHiring ? 'Company / Organization' : 'Project Type / Scope'}
        placeholder={isHiring ? 'e.g. Stripe, Linear, Early-Stage Startup' : 'e.g. Full-Stack MVP, React App, Automation Pipeline'}
        value={formData.companyOrScope}
        onChange={handleInputChange}
        error={errors.companyOrScope}
        maxLength={FIELD_LIMITS.companyOrScope.max}
        disabled={isSubmitting}
        icon={isHiring ? Building2 : Layers}
        iconClass={isHiring ? 'text-electric-blue' : 'text-emerald'}
      />

      {/* Message Textarea */}
      <ContactFormField
        id="contact-message"
        name="message"
        label="Message / Requirements"
        isTextarea={true}
        rows={4}
        placeholder={isHiring ? 'Tell me about the engineering role, team culture, key challenges, or tech stack...' : 'Describe your product goals, technical deliverables, or expected timeline...'}
        value={formData.message}
        onChange={handleInputChange}
        error={errors.message}
        maxLength={FIELD_LIMITS.message.max}
        disabled={isSubmitting}
        icon={MessageSquare}
        iconClass="text-slate-400"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${
          isHiring
            ? 'bg-electric-blue hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
            : 'bg-emerald hover:bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
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
