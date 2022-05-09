import { COINBASE_API_KEY } from '@/config/settings';
import { EnChargeType } from '@/interfaces/ICoinbase';
import { EnCurrency } from '@/interfaces/ICurrency';
import Coinbase from 'coinbase-commerce-node';

import { ICoinbaseProvider } from '../ICoinbaseProvider';

export class CoinbaseProvider implements ICoinbaseProvider {
  private charge = Coinbase.resources.Charge;

  constructor() {
    Coinbase.Client.init(COINBASE_API_KEY);
  }

  public async showCharge(code: string): Promise<Coinbase.ChargeResource> {
    try {
      const response = await this.charge.retrieve(code);
      return response;
    } catch (err) {
      console.log('err showing charge', err);
    }
  }

  public async createCharge(type: EnChargeType, value: number, currency: EnCurrency): Promise<Coinbase.ChargeResource> {
    const chargeData: any = {
      name: type,
      description: 'Charge for Klug Capital',
      local_price:
        value === 0
          ? undefined
          : {
              amount: value.toString(),
              currency
            },
      pricing_type: value === 0 ? 'no_price' : 'fixed_price'
    };

    try {
      const response = await this.charge.create(chargeData);
      return response;
    } catch (err) {
      console.log('err creating charge', err);
    }
  }
}
