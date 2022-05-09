import { TwoFaProvider } from '@/infra/twofa/implementations/TwoFaProvider';
import { IController } from '@/interfaces/IController';

import { ActiveFaController } from '../controllers/ActiveFaController';
import { ActiveFaUseCase } from '../usecases/ActiveFaUseCase';
import { makeUserDb } from './UserDbFactory';

export const makeActiveFaFactory = (): IController => {
  const userRepository = makeUserDb();
  const twoFaProvider = new TwoFaProvider();
  const activeFaUseCase = new ActiveFaUseCase(userRepository, twoFaProvider);
  const activeFaController = new ActiveFaController(activeFaUseCase);

  return activeFaController;
};
