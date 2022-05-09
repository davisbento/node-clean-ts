import { IuguProvider } from '@/infra/iugu/implementations/IuguProvider';
import { IController } from '@/interfaces/IController';

import { CreatePaymentMethodController } from '../controllers/CreatePaymentMethodController';
import { CreatePaymentMethodUseCase } from '../usecases/CreatePaymentMethodUseCase';
import { makeUserDb } from './UserDbFactory';

export const makeCreatePaymentMethodFactory = (): IController => {
  const userRepository = makeUserDb();
  const iuguProvider = new IuguProvider();
  const createPaymentMethodUseCase = new CreatePaymentMethodUseCase(userRepository, iuguProvider);
  const createPaymentMethodController = new CreatePaymentMethodController(createPaymentMethodUseCase);

  return createPaymentMethodController;
};
