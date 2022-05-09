import InternalServerError from '@/exceptions/InternalServerError';
import NotFoundException from '@/exceptions/NotFoundException';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { IBotSummaryReturn, ISummaryParams } from '@/interfaces/IBotSummary';
import { IBotRepository } from '@/repositories/IBotRepository';

import { BotAuthenticateUseCase } from './BotAuthenticateUseCase';

export class BotSummaryUseCase {
  constructor(
    private botRepository: IBotRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async summary(botId: string, userId: string, params: ISummaryParams) {
    const bot = await this.botRepository.findByIdAndUserId(botId, userId);

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    try {
      const botApiToken = await this.botAuthenticateUseCase.authenticate();

      const response = await this.apiProvider.get<IBotSummaryReturn>(
        `/report/revenue/robot/${bot.botApiId}/${params.startAt}/${params.endAt}`,
        null,
        botApiToken
      );

      return response;
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}
