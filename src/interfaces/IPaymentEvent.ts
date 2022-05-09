import { Document } from 'mongoose';

import { IStrategyWithoutRevenues } from './IStrategy';
import { ISubscription } from './ISubscription';

export interface IPaymentEvent extends Document, IPaymentEventGenerate {
  active: boolean;
  logs: IPaymentLogs[];
}

export interface IPaymentLogs {
  invoiceId: string;
  chargeDateBefore: Date;
  chargeDateAfter: Date;
  executionDate: Date;
  jobId: string;
}

export interface IPaymentEventGenerate {
  strategyId?: string;
  strategy?: IStrategyWithoutRevenues;
  subscriptionId?: string;
  subscription?: ISubscription;
  botId?: string;
  userId: string;
  paymentType: EnPaymentType;
  chargeDate: Date;
}

export enum EnPaymentType {
  performanceCommission = 'performanceCommission',
  membership = 'membership',
  subscription = 'subscription'
}
