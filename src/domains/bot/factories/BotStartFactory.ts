import { IController } from '@/interfaces/IController';

import { BotStartController } from '../controllers/BotStartController';
import { BotStartUseCase } from '../usecases/BotStartUseCase';
import { makeBotApi } from './BotApiFactory';
import { makeBotAuthenticateUseCase } from './BotAuthenticateFactory';
import { makeBotDb } from './BotDbFactory';

export const makeBotStartController = (): IController => {
  const botRepository = makeBotDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();

  const botStartUseCase = new BotStartUseCase(botRepository, apiProvider, botAuthenticateUseCase);
  const botStartController = new BotStartController(botStartUseCase);

  return botStartController;
};
