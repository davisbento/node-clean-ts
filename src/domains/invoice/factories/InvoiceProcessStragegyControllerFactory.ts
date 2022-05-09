import { makePaymentEventDb } from '@/domains/payment/factories/PaymentEventDbFactory';
import { makeUserDb } from '@/domains/user/factories/UserDbFactory';
import { makeVoucherDb } from '@/domains/voucher/factories/VoucherDbFactory';
import { CoinbaseProvider } from '@/infra/coinbase/implementations/CoinbaseProvider';
import { IController } from '@/interfaces/IController';

import { InvoiceProcessStrategyController } from '../controllers/InvoiceProcessStrategyController';
import { InvoiceProcessStrategyUseCase } from '../usecases/InvoiceProcessStrategyUseCase';
import { makeInvoiceDb } from './InvoiceDbFactory';

export const makeInvoiceProcessStrategyController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const voucherRepository = makeVoucherDb();
  const userRepository = makeUserDb();
  const paymentEventRepository = makePaymentEventDb();
  const coinbaseProvider = new CoinbaseProvider();

  const invoiceProcessUseCase = new InvoiceProcessStrategyUseCase(
    invoiceRepository,
    coinbaseProvider,
    voucherRepository,
    paymentEventRepository,
    userRepository
  );
  const processInvoiceController = new InvoiceProcessStrategyController(invoiceProcessUseCase);

  return processInvoiceController;
};
