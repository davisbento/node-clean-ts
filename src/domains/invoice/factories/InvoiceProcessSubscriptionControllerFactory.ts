import { makePaymentEventDb } from '@/domains/payment/factories/PaymentEventDbFactory';
import { makeUserDb } from '@/domains/user/factories/UserDbFactory';
import { CoinbaseProvider } from '@/infra/coinbase/implementations/CoinbaseProvider';
import { IController } from '@/interfaces/IController';

import { InvoiceProcessSubscriptionController } from '../controllers/InvoiceProcessSubscriptionController';
import { InvoiceProcessSubscriptionUseCase } from '../usecases/InvoiceProcessSubscriptionUseCase';
import { makeInvoiceDb } from './InvoiceDbFactory';

export const makeInvoiceProcessSubscriptionController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const userRepository = makeUserDb();
  const paymentEventRepository = makePaymentEventDb();
  const coinbaseProvider = new CoinbaseProvider();

  const invoiceProcessUseCase = new InvoiceProcessSubscriptionUseCase(
    invoiceRepository,
    coinbaseProvider,
    paymentEventRepository,
    userRepository
  );
  const processInvoiceController = new InvoiceProcessSubscriptionController(invoiceProcessUseCase);

  return processInvoiceController;
};
