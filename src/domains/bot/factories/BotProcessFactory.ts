import { IController } from '@/interfaces/IController';

import { BotProcessController } from '../controllers/BotProcessController';
import { BotProcessUseCase } from '../usecases/BotProcessUseCase';
import { makeBotApi } from './BotApiFactory';
import { makeBotAuthenticateUseCase } from './BotAuthenticateFactory';
import { makeBotDb } from './BotDbFactory';

export const makeBotProcessControler = (): IController => {
  const botRepository = makeBotDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();

  const botProcessUseCase = new BotProcessUseCase(botRepository, apiProvider, botAuthenticateUseCase);
  const botProcessController = new BotProcessController(botProcessUseCase);

  return botProcessController;
};
