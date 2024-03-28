import nodemailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';

import mail from '../config/mail';
import MailOptions from '../domain/misc/MailOptions';
import logger from './logger';

const { smtp, from } = mail;

const transporter: any = nodemailer.createTransport(smtp as any);
transporter.use('compile', markdown());

/**
 * Send email using nodemailer transporter.
 *
 * @param {MailOptions} mailOptions - Email options.
 * @returns {Promise<any>}
 */
export async function send(mailOptions: MailOptions): Promise<any> {
  try {
    if (!mailOptions.from) {
      mailOptions = { ...mailOptions, from };
    }

    logger.log('debug', 'Mail: Sending email with options -', mailOptions);

    return await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.log('error', 'Mail: Failed to send email - %s', err instanceof Error ? err.message : err);
  }
}

export default transporter;
