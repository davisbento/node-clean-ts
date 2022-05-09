import { RedisProvider } from '@/infra/redis/implementations/RedisProvider';
import { IController } from '@/interfaces/IController';

import { SyncBtcPriceController } from '../controllers/SyncBtcPriceController';
import { SyncBtcPriceUseCase } from '../usecases/SyncBtcPriceUseCase';

export const makeSyncBtcPriceUseCase = () => {
  const redisProvider = new RedisProvider();
  const syncBtcPriceUseCase = new SyncBtcPriceUseCase(redisProvider);

  return syncBtcPriceUseCase;
};

export const makeSyncBtcPriceController = (): IController => {
  const syncBtcPriceUseCase = makeSyncBtcPriceUseCase();
  const syncBtcPriceController = new SyncBtcPriceController(syncBtcPriceUseCase);

  return syncBtcPriceController;
};
