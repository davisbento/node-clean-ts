import { EnCurrency } from '@/interfaces/ICurrency';
import { EnChargeFrequency, IStrategy } from '@/interfaces/IStrategy';
import { Model, model, Schema } from 'mongoose';

const StrategySchema = new Schema<IStrategy>({
  name: String,
  deleted: {
    type: Boolean,
    default: false
  },
  showOnMarketplace: {
    type: Boolean,
    default: true
  },
  operationsActivated: {
    type: Boolean,
    default: true
  },
  membershipPrice: Number,
  membershipFrequency: {
    type: Number,
    enum: EnChargeFrequency
  },
  commissionPercent: Number,
  commissionFrequency: {
    type: Number,
    enum: EnChargeFrequency
  },
  currency: {
    type: String,
    enum: EnCurrency
  },
  usdMarginLimit: Number,
  totalInvestedAmount: Number,
  totalProfit: Number,
  totalUsersUsingThisStrategy: Number,
  minUsdInvestment: Number,
  revenueGoupedByMonth: {
    type: Array,
    default: []
  },
  strategyId: String,
  strategyStatus: String
});

export const Strategy: Model<IStrategy> = model<IStrategy>('Strategy', StrategySchema);
