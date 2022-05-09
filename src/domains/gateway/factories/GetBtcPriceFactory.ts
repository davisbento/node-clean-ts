import { RedisProvider } from '@/infra/redis/implementations/RedisProvider';

import { GetBtcPriceUseCase } from '../usecases/GetBtcPriceUseCase';
import { makeSyncBtcPriceUseCase } from './SyncBtcPriceFactory';

export const makeGetBtcPriceUseCase = () => {
  const redisProvider = new RedisProvider();
  const syncBtcPriceUseCase = makeSyncBtcPriceUseCase();
  const getBtcPriceUseCase = new GetBtcPriceUseCase(syncBtcPriceUseCase, redisProvider);

  return getBtcPriceUseCase;
};
