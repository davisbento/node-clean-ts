import { IRedisProvider } from '@/infra/redis/IRedisProvider';
import { CryptoSymbolEnum } from '@/interfaces/IGateway';

import { SyncBtcPriceUseCase } from './SyncBtcPriceUseCase';

export class GetBtcPriceUseCase {
  constructor(private syncBtcPricUseCase: SyncBtcPriceUseCase, private redisProvider: IRedisProvider) {}

  public async getBtcPrice(): Promise<number> {
    let btcPrice = 0;

    btcPrice = Number(await this.redisProvider.retrieve(CryptoSymbolEnum.BTCUSDT));
    if (!btcPrice) {
      await this.syncBtcPricUseCase.syncBtcPrice();
      btcPrice = Number(await this.redisProvider.retrieve(CryptoSymbolEnum.BTCUSDT));
    }

    return Number(btcPrice);
  }
}
