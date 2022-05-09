import { makeBotSummaryUseCase } from '@/domains/bot/factories/BotSummaryUseCaseFactory';
import { makeInvoiceDb } from '@/domains/invoice/factories/InvoiceDbFactory';
import { makePaymentEventDb } from '@/domains/payment/factories/PaymentEventDbFactory';
import { CoinbaseProvider } from '@/infra/coinbase/implementations/CoinbaseProvider';
import { IController } from '@/interfaces/IController';

import { PaymentCommissionProcessController } from '../controllers/PaymentCommissionProcessController';
import { PaymentCommissionProcessUseCase } from '../usecases/PaymentCommissionProcessUseCase';

export const makePaymentCommissionProcessController = (): IController => {
  const invoiceRepository = makeInvoiceDb();
  const paymentEventRepository = makePaymentEventDb();
  const coinbaseProvider = new CoinbaseProvider();

  const botSummaryUseCase = makeBotSummaryUseCase();

  const paymentProcessUseCase = new PaymentCommissionProcessUseCase(
    invoiceRepository,
    paymentEventRepository,
    coinbaseProvider,
    botSummaryUseCase
  );

  const paymentCommissionProcessController = new PaymentCommissionProcessController(paymentProcessUseCase);

  return paymentCommissionProcessController;
};
