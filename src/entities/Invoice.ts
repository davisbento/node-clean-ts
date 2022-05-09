import { generateHashId } from '@/helpers/GenerateHashId';
import { EnCurrency } from '@/interfaces/ICurrency';
import { EnInvoiceStatus, IInvoice } from '@/interfaces/IInvoice';
import { Model, model, Schema, Types } from 'mongoose';

const InvoiceSchema = new Schema<IInvoice>(
  {
    type: String,
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    },
    paid: {
      type: Boolean,
      default: false
    },
    priceFiat: {
      type: Number,
      required: true
    },
    identificator: {
      type: String,
      default: () => generateHashId()
    },
    isFirstInvoice: Boolean,
    strategyId: {
      type: Types.ObjectId,
      ref: 'Strategy'
    },
    subscriptionId: {
      type: Types.ObjectId,
      ref: 'Subscription'
    },
    botId: {
      type: Types.ObjectId,
      ref: 'Bot'
    },
    status: {
      type: String,
      default: EnInvoiceStatus.pending
    },
    currency: {
      type: String,
      enum: EnCurrency
    },
    strategy: Schema.Types.Mixed,
    subscription: Schema.Types.Mixed,
    secureUrl: String,
    expiresAt: Date,
    idIugu: String,
    assetPriceCreated: Number,
    pricing: Schema.Types.Mixed,
    addresses: Schema.Types.Mixed,
    metadata: Schema.Types.Mixed,
    paidAt: Date
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

InvoiceSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id'
});

export const Invoice: Model<IInvoice> = model<IInvoice>('Invoice', InvoiceSchema);
