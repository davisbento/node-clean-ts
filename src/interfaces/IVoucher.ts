import { Document } from 'mongoose';

import { IStrategyWithoutRevenues } from './IStrategy';

export interface IVoucher extends Document {
  userId: string;
  key: string;
  used: boolean;
  usedAt: Date;
  strategyId: string;
  strategy: IStrategyWithoutRevenues;
}
