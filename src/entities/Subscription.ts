import { EnCurrency } from '@/interfaces/ICurrency';
import { EnChargeFrequency } from '@/interfaces/IStrategy';
import { ISubscription } from '@/interfaces/ISubscription';
import { Model, model, Schema } from 'mongoose';

const SubscriptionSchema = new Schema<ISubscription>({
  name: String,
  value: Number,
  oldValue: Number,
  showOnPage: Boolean,
  exchanges: {
    type: Number,
    default: 0
  },
  frequency: {
    type: Number,
    enum: EnChargeFrequency
  },
  currency: {
    type: String,
    enum: EnCurrency
  },
  description: {
    type: Array
  }
});

export const Subscription: Model<ISubscription> = model<ISubscription>('Subscription', SubscriptionSchema);
