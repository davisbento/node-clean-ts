import { GetBtcOnBrlPriceUseCase } from '../usecases/GetBtcOnBrldPriceUseCase';
import { makeGetBtcBrlPriceUseCase } from './GetBtcBrlPriceFactory';

export const makeGetBtcOnBrlPriceUseCase = () => {
  const getBtcBrlPriceUseCase = makeGetBtcBrlPriceUseCase();
  const getBtcOnBrlPriceUseCase = new GetBtcOnBrlPriceUseCase(getBtcBrlPriceUseCase);

  return getBtcOnBrlPriceUseCase;
};
