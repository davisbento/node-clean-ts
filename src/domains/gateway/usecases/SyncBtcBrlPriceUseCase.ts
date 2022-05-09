import { percentage } from '@/helpers/Percentage';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { IRedisProvider } from '@/infra/redis/IRedisProvider';
import { CryptoSymbolEnum, IMercadoBitcoinReturn } from '@/interfaces/IGateway';
import { chain } from 'mathjs';

export class SyncBtcBrlPriceUseCase {
  constructor(private apiProvider: IApiProvider, private redisProvider: IRedisProvider) {}

  public async syncBtcBrlPrice(): Promise<void> {
    const response = await this.apiProvider.get<{ ticker: IMercadoBitcoinReturn }>('/');

    const price = parseFloat(response.ticker.buy);

    const marginFixed = 0.01;

    const calculated = percentage(marginFixed, price);
    const roundCalculated = chain(calculated).round(2).done();

    await this.redisProvider.persist(CryptoSymbolEnum.BTCBRL, roundCalculated, 20);
  }
}
