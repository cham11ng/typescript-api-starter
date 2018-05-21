/**
 * MailOptios Interface.
 */
interface MailOptions {
  from?: string;
  to: string;
  html?: string;
  text?: string;
  subject: string;
  markdown?: string;
}

export default MailOptions;
