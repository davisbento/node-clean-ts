import { IAddress } from '@/interfaces/IAddress';
import { Model, model, Schema } from 'mongoose';

const AddressSchema = new Schema<IAddress>({
  address: {
    type: String,
    unique: true,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  },
  usedAt: Date
});

export const Address: Model<IAddress> = model<IAddress>('Address', AddressSchema);
