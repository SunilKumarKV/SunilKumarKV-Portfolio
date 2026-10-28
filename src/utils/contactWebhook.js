/**
 * Contact Webhook Submission Service
 * Dispatches validated payloads to the n8n webhook with timeout,
 * error handling, and security sanitization.
 */

export const DEFAULT_N8N_WEBHOOK_URL =
  'https://primary-production-n8n.up.railway.app/webhook/sunilcraft-contact';

const REQUEST_TIMEOUT_MS = 15000; // 15-second timeout

/**
 * Sends contact payload to the n8n webhook
 * @param {Object} payload - Validated and sanitized submission payload
 * @param {Object} options - Optional fetch options / overrides
 * @returns {Promise<{ success: boolean, status: number }>}
 */
export async function sendContactSubmission(payload, options = {}) {
  const webhookUrl =
    options.webhookUrl ||
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_N8N_WEBHOOK_URL) ||
    DEFAULT_N8N_WEBHOOK_URL;

  const timeoutMs = options.timeoutMs || REQUEST_TIMEOUT_MS;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let serverDetail = '';
      try {
        const errJson = await response.json();
        serverDetail = errJson.message || errJson.error || '';
      } catch {
        // Fallback if response is text or empty
      }

      if (response.status === 404) {
        throw new Error('Transmission endpoint not found (404). Please contact Sunil directly.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment before trying again.');
      }
      if (response.status >= 500) {
        throw new Error(`Webhook service error (${response.status}). Please try again or reach out directly.`);
      }

      throw new Error(
        serverDetail || `Transmission failed with status ${response.status}. Please try again.`
      );
    }

    return {
      success: true,
      status: response.status,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error(
        'Request timed out after 15 seconds. Please check your connection or contact Sunil directly.'
      );
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Network error: Unable to reach transmission service. Please check your internet connection or email directly.'
      );
    }

    throw error;
  }
}
