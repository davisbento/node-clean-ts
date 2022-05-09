import { IController } from '@/interfaces/IController';

import { BotTestController } from '../controllers/BotTestController';
import { BotTestUseCase } from '../usecases/BotTestUseCase';
import { makeBotApi } from './BotApiFactory';
import { makeBotAuthenticateUseCase } from './BotAuthenticateFactory';
import { makeBotDb } from './BotDbFactory';

export const makeBotTestController = (): IController => {
  const botRepository = makeBotDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();

  const botTestUseCase = new BotTestUseCase(botRepository, apiProvider, botAuthenticateUseCase);
  const botTestController = new BotTestController(botTestUseCase);

  return botTestController;
};
