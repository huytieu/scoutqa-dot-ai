/**
 * Email service for Scout QA
 *
 * This module provides email sending functionality with automatic sender selection:
 * - Transactional emails (schedule execution, test reports, etc.) → "Scout"
 * - Marketing emails (welcome, campaigns, etc.) → "Huy at Scout"
 *
 * @example
 * import { sendEmail } from '@/lib/email';
 *
 * // Send a transactional email (from "Scout")
 * await sendEmail({
 *   type: 'schedule_execution_completed',
 *   to: 'user@example.com',
 *   subject: 'Test execution complete',
 *   html: '<p>Your test has finished.</p>'
 * });
 *
 * // Send a welcome email (from "Huy at Scout")
 * await sendEmail({
 *   type: 'welcome',
 *   to: 'user@example.com',
 *   subject: 'Welcome to Scout!',
 *   html: '<p>Welcome aboard!</p>'
 * });
 */

export {
  sendEmail,
  sendEmailWithSender,
  sendRawEmail,
  getSender,
  getSenderTypeForEmail,
} from "./service";

export { EMAIL_SENDERS, EMAIL_DOMAIN } from "./config";
export type { EmailSenderType } from "./config";

export { EMAIL_TYPE_CATEGORIES } from "./types";
export type {
  EmailCategory,
  EmailType,
  SendEmailOptions,
  SendTypedEmailOptions,
  SendEmailWithSenderOptions,
  SendEmailResult,
} from "./types";
