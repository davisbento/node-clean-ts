import { ChargeResource } from 'coinbase-commerce-node';
import { Document } from 'mongoose';

import { EnCurrency } from './ICurrency';
import { IPaymentEvent } from './IPaymentEvent';
import { EnChargeFrequency, IStrategyWithoutRevenues } from './IStrategy';
import { ISubscription } from './ISubscription';
import { IUser } from './IUser';

export enum EnInvoiceStatus {
  pending = 'pending',
  completed = 'completed',
  expired = 'expired',
  overpaid = 'overpaid',
  underpaid = 'underpaid',
  resolved = 'resolved',
  forced = 'forced',
  forcedWithEvent = 'forcedWithEvent',
  awaitingConfirmation = 'awaitingConfirmation',
  unresolved = 'unresolved',
  canceled = 'canceled',
  error = 'error'
}

export enum EnInvoiceType {
  strategyPurchase = 'strategyPurchase',
  subscriptionPurchase = 'subscriptionPurchase',
  subscriptionUpgrade = 'subscriptionUpgrade',
  subscription = 'subscription',
  performanceCommission = 'performanceCommission',
  membership = 'membership'
}

export interface IInvoiceGenerate {
  type: EnInvoiceType;
  userId: string;
  paidAt?: Date;
  paid?: boolean;
  status?: EnInvoiceStatus;
  strategyId?: string;
  subscriptionId?: string;
  priceFiat: number;
  currency: EnCurrency;
  botId?: string;
  addresses: ChargeResource['addresses'];
  pricing: Partial<ChargeResource['pricing']>;
  metadata?: ChargeResource;
  isFirstInvoice: boolean;
  strategy?: IStrategyWithoutRevenues;
  assetPriceCreated?: number;
  subscription?: ISubscription;
  expiresAt: Date;
  idIugu?: string;
  secureUrl?: string;
}

export interface IInvoiceList {
  id: string;
  currency: EnCurrency;
  createdAt: string;
  expiresAt: Date;
  status: EnInvoiceStatus;
  secureUrl: string;
  type: EnInvoiceType;
  priceFiat: number;
  addresses: ChargeResource['addresses'];
  pricing: Partial<ChargeResource['pricing']>;
}

export interface IInvoiceBase extends IInvoiceGenerate {
  identificator?: string;
  createdAt?: string;
}

export interface IInvoice extends Document, IInvoiceBase {}
export interface IGenerateInvoiceAndLogs {
  payment: IPaymentEvent;
  btcAssetPrice: number;
  priceCrypto?: number;
  priceFiat: number;
  frequency: EnChargeFrequency;
}

export interface IInvoicePopulatedDocument extends IInvoice {
  user: IUser[];
}
export interface IIuguInvoice {
  id: string;
  status: IuguInvoiceStatus;
  variables: Array<{ variable: string; value: string }>;
}
export interface IIuguRecentInvoices {
  id: string;
  status: IuguInvoiceStatus;
  due_date: string;
  total: string;
  secure_url: string;
}

export type IuguInvoiceStatus = 'paid' | 'pending' | 'canceled';
