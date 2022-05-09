import { IController } from '@/interfaces/IController';

import { ExchangeListByUserController } from '../controllers/ExchangeListByUserController';
import { ExchangeListByUserUseCase } from '../usecases/ExchangeListByUserUseCase';
import { makeExchangesDb } from './ExchangeDbFactory';

export const makeExchangeListByUserController = (): IController => {
  const exchangeRepository = makeExchangesDb();
  const exchangeListByUserUseCase = new ExchangeListByUserUseCase(exchangeRepository);
  const exchangeListByUserController = new ExchangeListByUserController(exchangeListByUserUseCase);

  return exchangeListByUserController;
};
