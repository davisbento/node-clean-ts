import { EnPaymentType, IPaymentEvent } from '@/interfaces/IPaymentEvent';
import { Model, model, Schema, Types } from 'mongoose';

const PaymentEventSchema = new Schema<IPaymentEvent>(
  {
    active: {
      type: Boolean,
      default: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User'
    },
    strategyId: {
      type: Types.ObjectId,
      ref: 'Strategy'
    },
    botId: {
      type: Types.ObjectId,
      ref: 'Bot'
    },
    subscriptionId: {
      type: Types.ObjectId,
      ref: 'Subscription'
    },
    paymentType: {
      type: String,
      enum: EnPaymentType
    },
    chargeDate: Date,
    strategy: Schema.Types.Mixed,
    subscription: Schema.Types.Mixed,
    logs: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

export const PaymentEvent: Model<IPaymentEvent> = model<IPaymentEvent>('PaymentEvent', PaymentEventSchema);
