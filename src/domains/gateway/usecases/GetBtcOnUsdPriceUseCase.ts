import { chain } from 'mathjs';

import { GetBtcPriceUseCase } from './GetBtcPriceUseCase';

export class GetBtcOnUsdPriceUseCase {
  constructor(private getBtcPriceUseCase: GetBtcPriceUseCase) {}

  public async getBtcPrice(usdPrice: number): Promise<number> {
    const btcPrice = await this.getBtcPriceUseCase.getBtcPrice();

    const price = usdPrice / btcPrice;

    return chain(price).round(8).done();
  }
}
