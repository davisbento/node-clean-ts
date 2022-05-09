import { MAIL_DOMAIN, MAIL_FROM, MAIL_KEY, MAIL_PUBLIC_KEY } from '@/config/settings';
import Mail, { Mailgun } from 'mailgun-js';

import { IMailProvider, IMessage, IValidateEmail } from '../IMailProvider';

export class MailGunProvider implements IMailProvider {
  private transporter: Mailgun;

  constructor() {
    this.transporter = new Mail({ apiKey: MAIL_KEY, domain: MAIL_DOMAIN, publicApiKey: MAIL_PUBLIC_KEY });
  }

  public async sendMail(message: IMessage): Promise<void> {
    try {
      const response = await this.transporter.messages().send({ ...message, from: MAIL_FROM });
      console.log('response mailgun', response);
    } catch (err) {
      console.log('err sending email', err);
    }
  }

  public async validateEmail(email: string): Promise<IValidateEmail> {
    try {
      const response = await this.transporter.validate(email);

      return {
        isValid: response.is_valid
      };
    } catch (err) {
      console.log('err validating email', err);
      throw new Error(err);
    }
  }
}
