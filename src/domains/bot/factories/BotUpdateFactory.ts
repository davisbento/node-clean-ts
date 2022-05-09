import { IController } from '@/interfaces/IController';

import { BotUpdateController } from '../controllers/BotUpdateController';
import { BotUpdateUseCase } from '../usecases/BotUpdateUseCase';
import { makeBotApi } from './BotApiFactory';
import { makeBotAuthenticateUseCase } from './BotAuthenticateFactory';
import { makeBotDb } from './BotDbFactory';

export const makeBotUpdateController = (): IController => {
  const botRepository = makeBotDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();
  const botUpdateUseCase = new BotUpdateUseCase(botRepository, apiProvider, botAuthenticateUseCase);
  const botUpdateController = new BotUpdateController(botUpdateUseCase);

  return botUpdateController;
};
