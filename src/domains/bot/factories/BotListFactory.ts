import { Bot } from '@/entities/Bot';
import { IController } from '@/interfaces/IController';
import { DbBotRepository } from '@/repositories/implementations/DbBotRepository';

import { BotListController } from '../controllers/BotListController';
import { BotListUseCase } from '../usecases/BotListUseCase';

export const makeBotListControllerFactory = (): IController => {
  const botRepository = new DbBotRepository(Bot);
  const botListUseCase = new BotListUseCase(botRepository);
  const botListController = new BotListController(botListUseCase);

  return botListController;
};
