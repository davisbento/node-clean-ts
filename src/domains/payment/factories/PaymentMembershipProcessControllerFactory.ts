import { makeInvoiceDb } from '@/domains/invoice/factories/InvoiceDbFactory';
import { makePaymentEventDb } from '@/domains/payment/factories/PaymentEventDbFactory';
import { CoinbaseProvider } from '@/infra/coinbase/implementations/CoinbaseProvider';
import { IController } from '@/interfaces/IController';

import { PaymentMembershipProcessController } from '../controllers/PaymentMembershipProcessController';
import { PaymentMembershipProcessUseCase } from '../usecases/PaymentMembershipProcessUseCase';

export const makePaymentMembershipProcessController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const paymentEventRepository = makePaymentEventDb();
  const coinbaseProvider = new CoinbaseProvider();
  const paymentProcessUseCase = new PaymentMembershipProcessUseCase(
    invoiceRepository,
    paymentEventRepository,
    coinbaseProvider
  );

  const paymentMembershipProcessController = new PaymentMembershipProcessController(paymentProcessUseCase);

  return paymentMembershipProcessController;
};
