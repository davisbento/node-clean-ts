import HttpRequestException from '@/exceptions/HttpRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { formatApiErrorMessage } from '@/helpers/FormatApiError';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { EnBotStatus } from '@/interfaces/IBot';
import { IBotRepository } from '@/repositories/IBotRepository';

import { BotAuthenticateUseCase } from './BotAuthenticateUseCase';

export class BotStartUseCase {
  constructor(
    private botRepository: IBotRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async start(botId: string, userId: string) {
    const bot = await this.botRepository.findByIdAndUserId(botId, userId);

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    const botApiToken = await this.botAuthenticateUseCase.authenticate();
    try {
      await this.apiProvider.post(`/robot/start?robotId=${bot.botApiId}`, null, botApiToken);

      await this.botRepository.updateBot(bot._id, { status: EnBotStatus.processing });
    } catch (err) {
      const statusCode = err?.status || 500;
      const messageFormatted = formatApiErrorMessage(err?.data?.errorCode);
      const message = messageFormatted || 'internal-server-error';
      throw new HttpRequestException(message, statusCode);
    }
  }
}
