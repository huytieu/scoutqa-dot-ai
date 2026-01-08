/**
 * Email configuration for Scout QA
 *
 * Sender name strategy:
 * - Transactional emails (automated notifications): "Scout"
 * - Marketing/Welcome emails (personal touch): "Huy at Scout"
 */

export const EMAIL_DOMAIN = "scoutqa.ai";

export const EMAIL_SENDERS = {
  /**
   * Transactional sender for automated notifications
   * Used for: schedule execution completed, test reports, system alerts
   */
  transactional: {
    name: "Scout",
    email: `notifications@${EMAIL_DOMAIN}`,
    get from() {
      return `${this.name} <${this.email}>`;
    },
  },

  /**
   * Marketing sender for personal communications
   * Used for: welcome emails, marketing campaigns, drip sequences
   */
  marketing: {
    name: "Huy at Scout",
    email: `huy@${EMAIL_DOMAIN}`,
    get from() {
      return `${this.name} <${this.email}>`;
    },
  },
} as const;

export type EmailSenderType = keyof typeof EMAIL_SENDERS;
