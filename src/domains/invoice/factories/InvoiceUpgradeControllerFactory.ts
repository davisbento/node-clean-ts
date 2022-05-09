import { makeSubscriptionDb } from '@/domains/subscription/factories/SubscriptionDbFactory';
import { makeUserDb } from '@/domains/user/factories/UserDbFactory';
import { CoinbaseProvider } from '@/infra/coinbase/implementations/CoinbaseProvider';
import { IuguProvider } from '@/infra/iugu/implementations/IuguProvider';
import { IController } from '@/interfaces/IController';

import { InvoiceUpgradeController } from '../controllers/InvoiceUpgradeController';
import { InvoiceUpgradeUseCase } from '../usecases/InvoiceUpgradeUseCase';
import { makeInvoiceDb } from './InvoiceDbFactory';

export const makeInvoiceUpgradeController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const subscriptionRepository = makeSubscriptionDb();
  const userRepositiory = makeUserDb();
  const coinbaseProvider = new CoinbaseProvider();
  const iuguProvider = new IuguProvider();

  const invoiceUpgradeUseCase = new InvoiceUpgradeUseCase(
    invoiceRepository,
    userRepositiory,
    subscriptionRepository,
    coinbaseProvider,
    iuguProvider
  );

  const invoiceUpgradeController = new InvoiceUpgradeController(invoiceUpgradeUseCase);

  return invoiceUpgradeController;
};
