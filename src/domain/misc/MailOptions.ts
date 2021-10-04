/**
 * MailOptions Interface.
 */
interface MailOptions {
  from?: {
    name: string;
    address: string;
  };
  to: string;
  html?: string;
  text?: string;
  subject: string;
  markdown?: string;
}

export default MailOptions;
