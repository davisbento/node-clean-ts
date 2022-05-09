import { generateHashId } from '@/helpers/GenerateHashId';
import { IVoucher } from '@/interfaces/IVoucher';
import { Model, model, Schema, Types } from 'mongoose';

const VoucherSchema = new Schema<IVoucher>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    used: {
      type: Boolean,
      default: false
    },
    usedAt: Date,
    strategyId: {
      type: Types.ObjectId,
      ref: 'Strategy',
      required: true
    },
    strategy: Schema.Types.Mixed,
    key: {
      type: String,
      default: () => generateHashId()
    }
  },
  { timestamps: true }
);

export const Voucher: Model<IVoucher> = model<IVoucher>('Voucher', VoucherSchema);
