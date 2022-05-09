import { IController } from '@/interfaces/IController';

import { BotSummaryController } from '../controllers/BotSummaryController';
import { makeBotSummaryUseCase } from './BotSummaryUseCaseFactory';

export const makeBotSummaryController = (): IController => {
  const botSummaryController = new BotSummaryController(makeBotSummaryUseCase());

  return botSummaryController;
};
