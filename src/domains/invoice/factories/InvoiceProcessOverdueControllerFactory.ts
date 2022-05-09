import { makeUserDb } from '@/domains/user/factories/UserDbFactory';
import { IController } from '@/interfaces/IController';

import { InvoiceProcessOverdueController } from '../controllers/InvoiceProcessOverdueController';
import { InvoiceProcessOverdueUseCase } from '../usecases/InvoiceProcessOverdueUseCase';
import { makeInvoiceDb } from './InvoiceDbFactory';

export const makeInvoiceProcessOverdueController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const userRepository = makeUserDb();

  const invoiceProcessUseCase = new InvoiceProcessOverdueUseCase(invoiceRepository, userRepository);
  const processInvoiceController = new InvoiceProcessOverdueController(invoiceProcessUseCase);

  return processInvoiceController;
};
