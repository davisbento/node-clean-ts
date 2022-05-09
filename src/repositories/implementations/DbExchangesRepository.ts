import { IExchangesCreate } from '@/domains/exchange/validation/ExchangesCreateDTO';
import { Exchanges } from '@/entities/Exchanges';
import { IExchanges } from '@/interfaces/IExchanges';

import { IExchangesRepository } from '../IExchangesRepository';

export class DbExchangesRepository implements IExchangesRepository {
  constructor(private readonly exchangeModel: typeof Exchanges) {}

  public async save(model: IExchangesCreate, userId: string): Promise<IExchanges> {
    const newExchange = new Exchanges({
      ...model,
      userId
    });
    await newExchange.save();

    return newExchange;
  }

  public async getExchangesByUserId(userId: string): Promise<IExchanges[]> {
    return this.exchangeModel.find({ userId, isActive: true });
  }
}
