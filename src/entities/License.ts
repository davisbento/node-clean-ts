import { EnCurrency } from '@/interfaces/ICurrency';
import { ILicense } from '@/interfaces/ILicense';
import { Model, model, Schema } from 'mongoose';

const LicenseSchema = new Schema<ILicense>({
  name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    enum: EnCurrency
  },
  active: Boolean,
  botsToUse: Number,
  value: Number,
  order: Number,
  description: String,
  usdMarginLimit: Number
});

export const License: Model<ILicense> = model<ILicense>('License', LicenseSchema);
