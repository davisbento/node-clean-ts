import { EnCurrency } from './ICurrency';

type PricingType = 'no_price' | 'fixed_price';

export enum EnChargeType {
  strategyPurchase = 'Strategy Purchase',
  subscriptionPurchase = 'Subscription Purchase',
  subscription = 'Subscription',
  commission = 'Performance Commission',
  membership = 'Membership'
}

export interface ICreateCharge {
  name: string;
  description: string;
  local_price: {
    amount: number;
    currency: EnCurrency;
  };
  pricing_type: PricingType;
}
