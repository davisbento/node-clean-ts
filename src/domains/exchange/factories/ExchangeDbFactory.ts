import { Exchanges } from '@/entities/Exchanges';
import { DbExchangesRepository } from '@/repositories/implementations/DbExchangesRepository';

export const makeExchangesDb = () => {
  const exchangesRepository = new DbExchangesRepository(Exchanges);

  return exchangesRepository;
};
