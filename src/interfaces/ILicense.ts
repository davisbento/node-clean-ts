import { Document } from 'mongoose';

import { EnCurrency } from './ICurrency';

export interface ILicense extends Document {
  name: string;
  currency: EnCurrency;
  value: number;
  botsToUse: number;
  order: number;
  active: boolean;
  usdMarginLimit: number;
}
