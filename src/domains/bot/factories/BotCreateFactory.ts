import { makePaymentEventDb } from '@/domains/payment/factories/PaymentEventDbFactory';
import { makeStrategyDb } from '@/domains/strategy/factories/StrategyDbFactory';
import { makeVoucherDb } from '@/domains/voucher/factories/VoucherDbFactory';
import { IController } from '@/interfaces/IController';

import { BotCreateController } from '../controllers/BotCreateController';
import { BotCreateUseCase } from '../usecases/BotCreateUseCase';
import { makeBotApi } from './BotApiFactory';
import { makeBotAuthenticateUseCase } from './BotAuthenticateFactory';
import { makeBotDb } from './BotDbFactory';

export const makeBotCreateController = (): IController => {
  const botRepository = makeBotDb();
  const strategyRepository = makeStrategyDb();
  const voucherRepository = makeVoucherDb();
  const paymentEventRepository = makePaymentEventDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();
  const botCreateUseCase = new BotCreateUseCase(
    botRepository,
    strategyRepository,
    voucherRepository,
    paymentEventRepository,
    apiProvider,
    botAuthenticateUseCase
  );
  const botCreateController = new BotCreateController(botCreateUseCase);

  return botCreateController;
};
