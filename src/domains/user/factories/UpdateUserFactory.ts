import { BcryptProvider } from '@/infra/cryptography/implementations/BcryptProvider';
import { IController } from '@/interfaces/IController';

import { UpdateUserController } from '../controllers/UpdateUserController';
import { UpdateUserUseCase } from '../usecases/UpdateUserUseCase';
import { makeUserDb } from './UserDbFactory';

export const makeUpdateUserFactory = (): IController => {
  const userRepository = makeUserDb();
  const cryptProvider = new BcryptProvider();
  const updateUserUseCase = new UpdateUserUseCase(userRepository, cryptProvider);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
