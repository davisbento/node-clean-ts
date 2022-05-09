import { User } from '@/entities/User';
import { BcryptProvider } from '@/infra/cryptography/implementations/BcryptProvider';
import { JwtProvider } from '@/infra/jwt/implementations/JwtProvider';
import { TwoFaProvider } from '@/infra/twofa/implementations/TwoFaProvider';
import { IController } from '@/interfaces/IController';
import { DbUserRepository } from '@/repositories/implementations/DbUserRepository';

import { AuthenticateController } from '../controllers/AuthenticateController';
import { AuthenticateUseCase } from '../usecases/AuthenticateUseCase';

export const makeAuthenticateController = (): IController => {
  const userRepository = new DbUserRepository(User);
  const cryptProvider = new BcryptProvider();
  const jwtProvider = new JwtProvider();
  const twoFaProvider = new TwoFaProvider();
  const authenticateUseCase = new AuthenticateUseCase(userRepository, cryptProvider, jwtProvider, twoFaProvider);
  const authenticateController = new AuthenticateController(authenticateUseCase);

  return authenticateController;
};
