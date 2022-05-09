/* eslint-disable camelcase */
export interface IMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}
export interface IValidateEmail {
  isValid: boolean;
}

export interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
  validateEmail(email: string): Promise<IValidateEmail>;
}
