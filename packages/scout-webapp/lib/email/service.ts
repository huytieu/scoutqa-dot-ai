import { Resend } from "resend";
import { EMAIL_SENDERS, type EmailSenderType } from "./config";
import {
  EMAIL_TYPE_CATEGORIES,
  type EmailType,
  type SendEmailOptions,
  type SendEmailResult,
  type SendEmailWithSenderOptions,
  type SendTypedEmailOptions,
} from "./types";

/**
 * Initialize Resend client
 * Requires RESEND_API_KEY environment variable
 */
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  return new Resend(apiKey);
}

/**
 * Get the sender type for a given email type
 */
export function getSenderTypeForEmail(emailType: EmailType): EmailSenderType {
  return EMAIL_TYPE_CATEGORIES[emailType];
}

/**
 * Get the sender configuration for a given sender type
 */
export function getSender(senderType: EmailSenderType) {
  return EMAIL_SENDERS[senderType];
}

/**
 * Send an email with automatic sender selection based on email type
 *
 * @example
 * // Transactional email - sends from "Scout"
 * await sendEmail({
 *   type: 'schedule_execution_completed',
 *   to: 'user@example.com',
 *   subject: 'Your test execution is complete',
 *   html: '<p>Your scheduled test has finished running.</p>'
 * });
 *
 * @example
 * // Marketing email - sends from "Huy at Scout"
 * await sendEmail({
 *   type: 'welcome',
 *   to: 'user@example.com',
 *   subject: 'Welcome to Scout!',
 *   html: '<p>Welcome aboard!</p>'
 * });
 */
export async function sendEmail(
  options: SendTypedEmailOptions
): Promise<SendEmailResult> {
  const { type, ...emailOptions } = options;
  const senderType = getSenderTypeForEmail(type);
  return sendEmailWithSender({ ...emailOptions, senderType });
}

/**
 * Send an email with explicit sender type
 *
 * Use this when you need direct control over which sender to use
 */
export async function sendEmailWithSender(
  options: SendEmailWithSenderOptions
): Promise<SendEmailResult> {
  const { senderType, ...emailOptions } = options;
  const sender = getSender(senderType);
  return sendRawEmail({ ...emailOptions, from: sender.from });
}

/**
 * Low-level email sending function
 * Prefer using sendEmail() or sendEmailWithSender() instead
 */
export async function sendRawEmail(
  options: SendEmailOptions & { from: string }
): Promise<SendEmailResult> {
  try {
    const resend = getResendClient();

    const { data, error } = await resend.emails.send({
      from: options.from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error occurred",
    };
  }
}
