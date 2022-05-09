import { IController } from '@/interfaces/IController';

import { BotPauseController } from '../controllers/BotPauseController';
import { BotPauseUseCase } from '../usecases/BotPauseUseCase';
import { makeBotApi } from './BotApiFactory';
import { makeBotAuthenticateUseCase } from './BotAuthenticateFactory';
import { makeBotDb } from './BotDbFactory';

export const makeBotPauseController = (): IController => {
  const botRepository = makeBotDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();

  const botPauseUseCase = new BotPauseUseCase(botRepository, apiProvider, botAuthenticateUseCase);
  const botPauseController = new BotPauseController(botPauseUseCase);

  return botPauseController;
};
