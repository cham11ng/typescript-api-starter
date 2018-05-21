import nodemailer from 'nodemailer';
import { markdown } from 'nodemailer-markdown';

import logger from './logger';
import config from '../config/config';
import MailOptions from '../domain/misc/MailOptions';

const { smtp, from } = config.mail;

const transporter: any = nodemailer.createTransport(smtp as any);

transporter.use('compile', markdown());

/**
 * Send email using nodemailer trasporter.
 *
 * @param {MailOptions} mailOptions
 */
export async function send(mailOptions: MailOptions) {
  try {
    if (!mailOptions.from) {
      mailOptions = { ...mailOptions, from };
    }

    logger.debug('Mail: Sending email with options -', JSON.stringify(mailOptions, null, 2));

    const info = await transporter.sendMail(mailOptions);

    return info;
  } catch (err) {
    logger.error('Mail: Failed to send email -', err.message);
  }
}

export default transporter;
