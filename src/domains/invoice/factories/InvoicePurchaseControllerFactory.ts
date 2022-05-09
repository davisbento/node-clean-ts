import { makeStrategyDb } from '@/domains/strategy/factories/StrategyDbFactory';
import { makeSubscriptionDb } from '@/domains/subscription/factories/SubscriptionDbFactory';
import { makeUserDb } from '@/domains/user/factories/UserDbFactory';
import { makeVoucherDb } from '@/domains/voucher/factories/VoucherDbFactory';
import { CoinbaseProvider } from '@/infra/coinbase/implementations/CoinbaseProvider';
import { IController } from '@/interfaces/IController';

import { InvoicePurchaseController } from '../controllers/InvoicePurchaseController';
import { InvoicePurchaseUseCase } from '../usecases/InvoicePurchaseUseCase';
import { makeInvoiceDb } from './InvoiceDbFactory';

export const makeInvoicePurchaseController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const strategyRepository = makeStrategyDb();
  const userRepository = makeUserDb();
  const subscriptionRepository = makeSubscriptionDb();
  const voucherRepository = makeVoucherDb();
  const coinbaseProvider = new CoinbaseProvider();

  const invoicePurchaseUseCase = new InvoicePurchaseUseCase(
    invoiceRepository,
    strategyRepository,
    voucherRepository,
    userRepository,
    subscriptionRepository,
    coinbaseProvider
  );

  const invoicePurchaseController = new InvoicePurchaseController(invoicePurchaseUseCase);

  return invoicePurchaseController;
};
