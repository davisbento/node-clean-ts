import { API_MERCADO_BTC_URL } from '@/config/settings';
import { ApiProvider } from '@/infra/api/implementations/ApiProvider';
import { RedisProvider } from '@/infra/redis/implementations/RedisProvider';
import { IController } from '@/interfaces/IController';

import { SyncBtcBrlPriceController } from '../controllers/SyncBtcBrlPriceController';
import { SyncBtcBrlPriceUseCase } from '../usecases/SyncBtcBrlPriceUseCase';

export const makeSyncBtcBrlUseCase = () => {
  const apiProvider = new ApiProvider(API_MERCADO_BTC_URL);
  const redisProvider = new RedisProvider();
  const syncBtcBrlPriceUseCase = new SyncBtcBrlPriceUseCase(apiProvider, redisProvider);

  return syncBtcBrlPriceUseCase;
};

export const makeSyncBtcBrlController = (): IController => {
  const syncBtcBrlPriceUseCase = makeSyncBtcBrlUseCase();
  const syncBtcBrlPriceController = new SyncBtcBrlPriceController(syncBtcBrlPriceUseCase);

  return syncBtcBrlPriceController;
};
