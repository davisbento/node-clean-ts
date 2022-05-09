import { User } from '@/entities/User';
import { BcryptProvider } from '@/infra/cryptography/implementations/BcryptProvider';
import { JwtProvider } from '@/infra/jwt/implementations/JwtProvider';
import { TwoFaProvider } from '@/infra/twofa/implementations/TwoFaProvider';
import { IController } from '@/interfaces/IController';
import { DbUserRepository } from '@/repositories/implementations/DbUserRepository';

import { SignUpController } from '../controllers/SignUpController';
import { SignUpUseCase } from '../usecases/SignUpUseCase';

export const makeSignUpController = (): IController => {
  const userRepository = new DbUserRepository(User);
  const cryptProvider = new BcryptProvider();
  const jwtProvider = new JwtProvider();
  const twoFaProvider = new TwoFaProvider();
  const signUpUseCase = new SignUpUseCase(userRepository, cryptProvider, jwtProvider, twoFaProvider);
  const signUpController = new SignUpController(signUpUseCase);

  return signUpController;
};
