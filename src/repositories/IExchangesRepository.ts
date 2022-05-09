import { IExchangesCreate } from '@/domains/exchange/validation/ExchangesCreateDTO';
import { IExchanges } from '@/interfaces/IExchanges';

export interface IExchangesRepository {
  save(model: IExchangesCreate, userId: string): Promise<IExchanges>;
  getExchangesByUserId(userId: string): Promise<IExchanges[]>;
}
