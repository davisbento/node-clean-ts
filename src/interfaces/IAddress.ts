import { Document } from 'mongoose';

export interface IAddress extends Document {
  used: boolean;
  address: string;
  usedAt: Date;
}
