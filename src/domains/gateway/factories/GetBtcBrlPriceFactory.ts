import { RedisProvider } from '@/infra/redis/implementations/RedisProvider';

import { GetBtcBrlPriceUseCase } from '../usecases/GetBtcBrlPriceUseCase';
import { makeSyncBtcBrlUseCase } from './SyncBtcBrlPriceFactory';

export const makeGetBtcBrlPriceUseCase = () => {
  const redisProvider = new RedisProvider();
  const syncBtcBrlPriceUseCase = makeSyncBtcBrlUseCase();
  const getBtcBrlPriceUseCase = new GetBtcBrlPriceUseCase(syncBtcBrlPriceUseCase, redisProvider);

  return getBtcBrlPriceUseCase;
};
