import { makeUserDb } from '@/domains/user/factories/UserDbFactory';
import { IuguProvider } from '@/infra/iugu/implementations/IuguProvider';
import { IController } from '@/interfaces/IController';

import { InvoiceProcessIuguController } from '../controllers/InvoiceProcessIuguController';
import { InvoiceProcessIuguUseCase } from '../usecases/InvoiceProcessIuguUseCase';
import { makeInvoiceDb } from './InvoiceDbFactory';

export const makeInvoiceProcessIuguController = (): IController => {
  const iuguProvider = new IuguProvider();
  const userRepository = makeUserDb();
  const invoiceRepository = makeInvoiceDb();
  const invoiceProcessIuguUseCase = new InvoiceProcessIuguUseCase(invoiceRepository, userRepository, iuguProvider);
  const invoiceProcessIuguController = new InvoiceProcessIuguController(invoiceProcessIuguUseCase);

  return invoiceProcessIuguController;
};
