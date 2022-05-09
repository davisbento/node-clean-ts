import { GetBtcBrlPriceUseCase } from '@/domains/gateway/usecases/GetBtcBrlPriceUseCase';
import { GetBtcOnBrlPriceUseCase } from '@/domains/gateway/usecases/GetBtcOnBrldPriceUseCase';
import { GetBtcOnUsdPriceUseCase } from '@/domains/gateway/usecases/GetBtcOnUsdPriceUseCase';
import { GetBtcPriceUseCase } from '@/domains/gateway/usecases/GetBtcPriceUseCase';
import { EnCurrency } from '@/interfaces/ICurrency';
import { IBtcPriceReturn } from '@/interfaces/IGateway';

export class GetBtcPriceOnCurrencyUseCase {
  constructor(
    private getBtcPriceUseCase: GetBtcPriceUseCase,
    private getBtcOnUsdPriceUseCase: GetBtcOnUsdPriceUseCase,
    private getBtcBrlPriceUseCase: GetBtcBrlPriceUseCase,
    private getBtcOnBrlPriceUseCase: GetBtcOnBrlPriceUseCase
  ) {}

  public async getPrice(currency: EnCurrency, value: number): Promise<IBtcPriceReturn> {
    const btcAssetPrice = await this.getBtcAssetPrice(currency);

    const btcPriceOnCurrency = await this.getBtcPriceOnCurrency(currency, value);

    return {
      btcAssetPrice,
      btcPriceOnCurrency
    };
  }

  private async getBtcAssetPrice(currency: EnCurrency) {
    if (currency === EnCurrency.USD) {
      return this.getBtcPriceUseCase.getBtcPrice();
    }

    return this.getBtcBrlPriceUseCase.getBtcBrlPrice();
  }

  private async getBtcPriceOnCurrency(currency: EnCurrency, value: number) {
    if (currency === EnCurrency.USD) {
      return this.getBtcOnUsdPriceUseCase.getBtcPrice(value);
    }

    return this.getBtcOnBrlPriceUseCase.getBtcPrice(value);
  }
}
