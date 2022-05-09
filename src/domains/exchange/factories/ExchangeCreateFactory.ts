import { makeUserDb } from '@/domains/user/factories/UserDbFactory';
import { IController } from '@/interfaces/IController';

import { ExchangeCreateController } from '../controllers/ExchangeCreateController';
import { ExchangeCreateUseCase } from '../usecases/ExchangesCreateUseCase';
import { makeExchangesDb } from './ExchangeDbFactory';

export const makeExchangeCreateController = (): IController => {
  const exchangeRepository = makeExchangesDb();
  const userRepository = makeUserDb();
  const exchangeCreateUseCase = new ExchangeCreateUseCase(exchangeRepository, userRepository);
  const exchangeCreateController = new ExchangeCreateController(exchangeCreateUseCase);

  return exchangeCreateController;
};
