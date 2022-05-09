import { GetBtcOnUsdPriceUseCase } from '../usecases/GetBtcOnUsdPriceUseCase';
import { makeGetBtcPriceUseCase } from './GetBtcPriceFactory';

export const makeGetBtcOnUsdPriceUseCase = () => {
  const getBtcPriceUseCase = makeGetBtcPriceUseCase();
  const getBtcOnUsdPriceUseCase = new GetBtcOnUsdPriceUseCase(getBtcPriceUseCase);

  return getBtcOnUsdPriceUseCase;
};
