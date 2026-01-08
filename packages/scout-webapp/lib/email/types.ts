import type { EmailSenderType } from "./config";

/**
 * Email category determines which sender profile to use
 */
export type EmailCategory = "transactional" | "marketing";

/**
 * Mapping of email types to their categories
 */
export const EMAIL_TYPE_CATEGORIES = {
  // Transactional emails - automated notifications
  schedule_execution_completed: "transactional",
  test_report: "transactional",
  password_reset: "transactional",
  email_verification: "transactional",
  system_alert: "transactional",
  usage_limit_warning: "transactional",
  payment_confirmation: "transactional",
  subscription_updated: "transactional",

  // Marketing emails - personal communications
  welcome: "marketing",
  onboarding_day_1: "marketing",
  onboarding_day_3: "marketing",
  onboarding_day_7: "marketing",
  feature_announcement: "marketing",
  newsletter: "marketing",
  product_update: "marketing",
  feedback_request: "marketing",
  re_engagement: "marketing",
} as const satisfies Record<string, EmailCategory>;

export type EmailType = keyof typeof EMAIL_TYPE_CATEGORIES;

/**
 * Base email fields required for all emails
 */
interface BaseEmailFields {
  to: string | string[];
  subject: string;
  replyTo?: string;
}

/**
 * Email content - at least one of html or text must be provided
 */
type EmailContent =
  | { html: string; text?: string }
  | { html?: string; text: string };

/**
 * Base options for sending an email
 * Requires at least one of html or text content
 */
export type SendEmailOptions = BaseEmailFields & EmailContent;

/**
 * Options for sending a typed email with automatic sender selection
 */
export type SendTypedEmailOptions = SendEmailOptions & {
  type: EmailType;
};

/**
 * Options for sending an email with explicit sender type
 */
export type SendEmailWithSenderOptions = SendEmailOptions & {
  senderType: EmailSenderType;
};

/**
 * Result of sending an email
 */
export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}
