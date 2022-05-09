import { IController } from '@/interfaces/IController';

import { InvoiceListController } from '../controllers/InvoiceListController';
import { InvoiceListUseCase } from '../usecases/InvoiceListUseCase';
import { makeInvoiceDb } from './InvoiceDbFactory';

export const makeInvoiceListController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const invoiceListUseCase = new InvoiceListUseCase(invoiceRepository);
  const invoiceListController = new InvoiceListController(invoiceListUseCase);

  return invoiceListController;
};
