import { API_BINANCE_URL } from '@/config/settings';
import { percentage } from '@/helpers/Percentage';
import { IRedisProvider } from '@/infra/redis/IRedisProvider';
import { CryptoSymbolEnum, IBinanceReturn } from '@/interfaces/IGateway';
import axios from 'axios';
import { chain } from 'mathjs';

export class SyncBtcPriceUseCase {
  constructor(private redisProvider: IRedisProvider) {}

  public async syncBtcPrice(): Promise<void> {
    const response = await axios.get<IBinanceReturn>(`${API_BINANCE_URL}/bookTicker`, {
      params: {
        symbol: CryptoSymbolEnum.BTCUSDT
      }
    });

    const data = response.data;

    const price = data.bidPrice;

    const marginFixed = 0.01;

    const calculated = percentage(marginFixed, price);

    const roundCalculated = chain(calculated).round(2).done();

    await this.redisProvider.persist(CryptoSymbolEnum.BTCUSDT, roundCalculated, 20);
  }
}
