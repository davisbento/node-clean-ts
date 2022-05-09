import { IController } from '@/interfaces/IController';

import { GetProfileController } from '../controllers/GetProfileController';
import { GetProfileUseCase } from '../usecases/GetProfileUseCase';
import { makeUserDb } from './UserDbFactory';

export const makeGetProfileController = (): IController => {
  const userRepository = makeUserDb();
  const getProfileUseCase = new GetProfileUseCase(userRepository);
  const getProfileController = new GetProfileController(getProfileUseCase);

  return getProfileController;
};
