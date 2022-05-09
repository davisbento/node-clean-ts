import { Document } from 'mongoose';

export interface IBotPayload {
  assetBaseId: string;
  assetQuoteId: string;
  exchangeId: string;
  credentials?: {
    apiKey: string;
    apiSecret: string;
  };
  tags?: string[];
  usdMarginLimit?: number;
  robotStatus?: EnBotStatus;
  id?: string;
  strategyId?: string;
}
export interface IBotList {
  id: string;
  name: string;
  strategyId: string;
  strategyName: string;
  createdAt: string;
  status: EnBotStatus;
}

export enum EnBotStatus {
  deleted = 'DELETED',
  active = 'ACTIVE',
  idle = 'IDLE',
  new = 'NEW',
  paused = 'PAUSED',
  processing = 'PROCESSING'
}

export interface IBot extends Document {
  userId: string;
  name: string;
  identificator: string;
  status: EnBotStatus;
  strategyId: string;
  strategyName: string;
  botApiId: string;
  botApiReturn: any;
  createdAt: string;
}
