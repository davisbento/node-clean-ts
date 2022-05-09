import { makeInvoiceDb } from '@/domains/invoice/factories/InvoiceDbFactory';
import { makePaymentEventDb } from '@/domains/payment/factories/PaymentEventDbFactory';
import { CoinbaseProvider } from '@/infra/coinbase/implementations/CoinbaseProvider';
import { IController } from '@/interfaces/IController';

import { PaymentSubscriptionProcessController } from '../controllers/PaymentSubscriptionProcessController';
import { PaymentSubscriptionProcessUseCase } from '../usecases/PaymentSubscriptionProcessUseCase';

export const makePaymentSubscriptionProcessController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const paymentEventRepository = makePaymentEventDb();
  const coinbaseProvider = new CoinbaseProvider();

  const paymentSubscriptionProcessUseCase = new PaymentSubscriptionProcessUseCase(
    invoiceRepository,
    paymentEventRepository,
    coinbaseProvider
  );

  const paymentProcessController = new PaymentSubscriptionProcessController(paymentSubscriptionProcessUseCase);

  return paymentProcessController;
};
