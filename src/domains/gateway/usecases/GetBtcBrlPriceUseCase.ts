import { IRedisProvider } from '@/infra/redis/IRedisProvider';
import { CryptoSymbolEnum } from '@/interfaces/IGateway';

import { SyncBtcBrlPriceUseCase } from './SyncBtcBrlPriceUseCase';

export class GetBtcBrlPriceUseCase {
  constructor(private syncBtcBrlUseCase: SyncBtcBrlPriceUseCase, private redisProvider: IRedisProvider) {}

  public async getBtcBrlPrice(): Promise<number> {
    let btcPrice = 0;

    btcPrice = Number(await this.redisProvider.retrieve(CryptoSymbolEnum.BTCBRL));

    if (!btcPrice) {
      await this.syncBtcBrlUseCase.syncBtcBrlPrice();
      btcPrice = Number(await this.redisProvider.retrieve(CryptoSymbolEnum.BTCBRL));
    }

    return Number(btcPrice);
  }
}
