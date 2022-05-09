import { makeBotApi } from '@/domains/bot/factories/BotApiFactory';
import { makeBotAuthenticateUseCase } from '@/domains/bot/factories/BotAuthenticateFactory';
import { IController } from '@/interfaces/IController';

import { StrategyProcessController } from '../controllers/StrategyProcessController';
import { StrategyProcessUseCase } from '../usecases/StrategyProcessUseCase';
import { makeStrategyDb } from './StrategyDbFactory';

export const makeStrategyProcessControler = (): IController => {
  const strategyRepository = makeStrategyDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();

  const strategyProcessUseCase = new StrategyProcessUseCase(strategyRepository, apiProvider, botAuthenticateUseCase);

  const strategyProcessController = new StrategyProcessController(strategyProcessUseCase);

  return strategyProcessController;
};
