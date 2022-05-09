import { Document } from 'mongoose';

import { EnCurrency } from './ICurrency';
import { EnChargeFrequency } from './IStrategy';

export interface ISubscription extends Document {
  currency: EnCurrency;
  value: number;
  oldValue: number;
  name: string;
  showOnPage: boolean;
  frequency: EnChargeFrequency;
  exchanges: number;
  description: IDescription[];
}

export interface ISubscriptionList {
  id: string;
  name: string;
  currency: EnCurrency;
  value: number;
  oldValue: number;
  frequency: string;
  description: IDescription[];
}

interface IDescription {
  name: string;
  check: boolean;
}
