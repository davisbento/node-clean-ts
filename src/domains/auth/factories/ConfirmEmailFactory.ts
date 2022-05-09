import { User } from '@/entities/User';
import { RedisProvider } from '@/infra/redis/implementations/RedisProvider';
import { IController } from '@/interfaces/IController';
import { DbUserRepository } from '@/repositories/implementations/DbUserRepository';

import { ConfirmEmailController } from '../controllers/ConfirmEmailController';
import { ConfirmEmailUseCase } from '../usecases/ConfirmEmailUseCase';

export const makeConfirmEmailController = (): IController => {
  const userRepository = new DbUserRepository(User);
  const redisProvider = new RedisProvider();
  const confirmEmailUseCase = new ConfirmEmailUseCase(userRepository, redisProvider);
  const confirmEmailController = new ConfirmEmailController(confirmEmailUseCase);

  return confirmEmailController;
};
