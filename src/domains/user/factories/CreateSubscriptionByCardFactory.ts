import { makeInvoiceDb } from '@/domains/invoice/factories/InvoiceDbFactory';
import { IuguProvider } from '@/infra/iugu/implementations/IuguProvider';
import { IController } from '@/interfaces/IController';

import { CreateSubscriptionByCardController } from '../controllers/CreateSubscriptionByCardController';
import { CreateSubscriptionByCardUseCase } from '../usecases/CreateSubscriptionByCardUseCase';
import { makeUserDb } from './UserDbFactory';

export const makeCreateSubscriptionByCardFactory = (): IController => {
  const userRepository = makeUserDb();
  const invoiceRepository = makeInvoiceDb();
  const iuguProvider = new IuguProvider();
  const createSubscriptionByCardUseCase = new CreateSubscriptionByCardUseCase(
    userRepository,
    invoiceRepository,
    iuguProvider
  );
  const createSubscriptionByCardController = new CreateSubscriptionByCardController(createSubscriptionByCardUseCase);

  return createSubscriptionByCardController;
};
