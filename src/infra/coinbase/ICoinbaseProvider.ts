import { EnChargeType } from '@/interfaces/ICoinbase';
import { EnCurrency } from '@/interfaces/ICurrency';
import { ChargeResource } from 'coinbase-commerce-node';

export interface ICoinbaseProvider {
  createCharge(type: EnChargeType, value: number, currency: EnCurrency): Promise<ChargeResource>;
  showCharge(code: string): Promise<ChargeResource>;
}
