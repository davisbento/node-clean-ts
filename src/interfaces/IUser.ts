import { Document } from 'mongoose';

import { IPhone } from './IPhone';
import { IStrategyWithoutRevenues } from './IStrategy';
import { ISubscription } from './ISubscription';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  identificator: string;
  dob: Date;
  phone: IPhone;
  emailConfirm?: boolean;
  strategies?: IUserStrategy[];
  cardTokens: string[];
  paymentGatewayUserId: string;
  otpSecret: string;
  otpImageUrl: string;
  otpActive: boolean;
  iuguSubscriptionId?: string;
  subscription: ISubscription;
  paymentMethods: any[];
  hasPaiedSubscription: boolean;
}

export interface IUserStrategy extends Document {
  strategy: IStrategyWithoutRevenues;
  invoiceId?: string;
}
