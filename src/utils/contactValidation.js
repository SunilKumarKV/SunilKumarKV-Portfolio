/**
 * Contact Form Validation Utilities
 * Validates required fields, email formatting, lengths,
 * and produces field-level error messages.
 */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;

export const FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { min: 5, max: 150 },
  companyOrScope: { min: 2, max: 150 },
  message: { min: 10, max: 3000 },
};

/**
 * Validates contact form data
 * @param {Object} data - Raw form inputs
 * @param {string} intent - 'hiring' | 'freelance'
 * @returns {{ isValid: boolean, errors: Record<string, string>, sanitized: { name: string, email: string, companyOrScope: string, message: string } }}
 */
export function validateContactForm(data = {}, intent = 'hiring') {
  const errors = {};
  const isHiring = intent === 'hiring';

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const companyOrScope = (data.companyOrScope || '').trim();
  const message = (data.message || '').trim();

  // Name validation
  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < FIELD_LIMITS.name.min) {
    errors.name = `Name must be at least ${FIELD_LIMITS.name.min} characters.`;
  } else if (name.length > FIELD_LIMITS.name.max) {
    errors.name = `Name cannot exceed ${FIELD_LIMITS.name.max} characters.`;
  }

  // Email validation
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address (e.g. alex@company.com).';
  } else if (email.length > FIELD_LIMITS.email.max) {
    errors.email = `Email cannot exceed ${FIELD_LIMITS.email.max} characters.`;
  }

  // Company or Project Scope validation
  if (!companyOrScope) {
    errors.companyOrScope = isHiring
      ? 'Please enter your company or organization name.'
      : 'Please enter your project type or scope.';
  } else if (companyOrScope.length < FIELD_LIMITS.companyOrScope.min) {
    errors.companyOrScope = isHiring
      ? `Company name must be at least ${FIELD_LIMITS.companyOrScope.min} characters.`
      : `Project scope must be at least ${FIELD_LIMITS.companyOrScope.min} characters.`;
  } else if (companyOrScope.length > FIELD_LIMITS.companyOrScope.max) {
    errors.companyOrScope = `This field cannot exceed ${FIELD_LIMITS.companyOrScope.max} characters.`;
  }

  // Message validation
  if (!message) {
    errors.message = isHiring
      ? 'Please describe the engineering role or key challenges.'
      : 'Please describe your project deliverables or goals.';
  } else if (message.length < FIELD_LIMITS.message.min) {
    errors.message = `Message must be at least ${FIELD_LIMITS.message.min} characters.`;
  } else if (message.length > FIELD_LIMITS.message.max) {
    errors.message = `Message cannot exceed ${FIELD_LIMITS.message.max} characters.`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      email,
      companyOrScope,
      message,
    },
  };
}
