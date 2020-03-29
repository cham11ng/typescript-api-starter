import nodemailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';

import logger from './logger';
import mail from '../config/mail';
import MailOptions from '../domain/misc/MailOptions';

const { smtp, from } = mail;

const transporter: any = nodemailer.createTransport(smtp as any);
transporter.use('compile', markdown());

/**
 * Send email using nodemailer transporter.
 *
 * @param {MailOptions} mailOptions
 */
export async function send(mailOptions: MailOptions): Promise<any> {
  try {
    if (!mailOptions.from) {
      mailOptions = { ...mailOptions, from };
    }

    logger.log('debug', 'Mail: Sending email with options -', mailOptions);

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (err) {
    logger.log('error', 'Mail: Failed to send email - %s', err.message);
  }
}

export default transporter;
