import { Document } from 'mongoose';

export interface IExchanges extends Document {
  userId: string;
  name: string;
  apiKey: string;
  apiSecret: string;
  isActive: boolean;
}
