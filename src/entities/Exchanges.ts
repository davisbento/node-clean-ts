import { IExchanges } from '@/interfaces/IExchanges';
import { Model, model, Schema, Types } from 'mongoose';

const ExchangesSchema = new Schema<IExchanges>({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  apiKey: String,
  apiSecret: String,
  isActive: {
    type: Boolean,
    default: true
  }
});

export const Exchanges: Model<IExchanges> = model<IExchanges>('Exchanges', ExchangesSchema);
