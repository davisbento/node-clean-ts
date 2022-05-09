import { User } from '@/entities/User';
import { BcryptProvider } from '@/infra/cryptography/implementations/BcryptProvider';
import { MailGunProvider } from '@/infra/mail/implementations/MailGunProvider';
import { IController } from '@/interfaces/IController';
import { DbUserRepository } from '@/repositories/implementations/DbUserRepository';

import { ForgotPasswordController } from '../controllers/ForgotPasswordController';
import { ForgotPasswordUseCase } from '../usecases/ForgotPasswordUseCase';

export const makeForgotPasswordController = (): IController => {
  const userRepository = new DbUserRepository(User);
  const mailprovider = new MailGunProvider();
  const bcryptProvider = new BcryptProvider();
  const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepository, mailprovider, bcryptProvider);
  const forgotPasswordController = new ForgotPasswordController(forgotPasswordUseCase);

  return forgotPasswordController;
};
