import { chain } from 'mathjs';

import { GetBtcBrlPriceUseCase } from './GetBtcBrlPriceUseCase';

export class GetBtcOnBrlPriceUseCase {
  constructor(private getBtcBrlPriceUseCase: GetBtcBrlPriceUseCase) {}

  public async getBtcPrice(brlPrice: number): Promise<number> {
    const btcPrice = await this.getBtcBrlPriceUseCase.getBtcBrlPrice();

    const price = brlPrice / btcPrice;

    return chain(price).round(8).done();
  }
}
