import { GetBtcPriceOnCurrencyUseCase } from '../usecases/GetBtcPriceOnCurrencyUseCase';
import { makeGetBtcBrlPriceUseCase } from './GetBtcBrlPriceFactory';
import { makeGetBtcOnBrlPriceUseCase } from './GetBtcOnBrlPriceUseCase';
import { makeGetBtcOnUsdPriceUseCase } from './GetBtcOnUsdPriceUseCase';
import { makeGetBtcPriceUseCase } from './GetBtcPriceFactory';

export const makeGetBtcOnCurrencyUseCaseFactory = () => {
  const getBtcPriceUseCase = makeGetBtcPriceUseCase();
  const getBtcOnUsdPriceUseCase = makeGetBtcOnUsdPriceUseCase();
  const getBtcBrlPriceUseCase = makeGetBtcBrlPriceUseCase();
  const getBtcOnBrlPriceUseCase = makeGetBtcOnBrlPriceUseCase();

  const getBtcPriceOnCurrencyUseCase = new GetBtcPriceOnCurrencyUseCase(
    getBtcPriceUseCase,
    getBtcOnUsdPriceUseCase,
    getBtcBrlPriceUseCase,
    getBtcOnBrlPriceUseCase
  );

  return getBtcPriceOnCurrencyUseCase;
};
