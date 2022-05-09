import { BotSummaryUseCase } from '../usecases/BotSummaryUseCase';
import { makeBotApi } from './BotApiFactory';
import { makeBotAuthenticateUseCase } from './BotAuthenticateFactory';
import { makeBotDb } from './BotDbFactory';

export const makeBotSummaryUseCase = () => {
  const botRepository = makeBotDb();
  const apiProvider = makeBotApi();
  const botAuthenticateUseCase = makeBotAuthenticateUseCase();
  const botSummaryUseCase = new BotSummaryUseCase(botRepository, apiProvider, botAuthenticateUseCase);

  return botSummaryUseCase;
};
