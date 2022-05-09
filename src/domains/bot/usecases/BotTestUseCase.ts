import HttpRequestException from '@/exceptions/HttpRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { formatApiErrorMessage } from '@/helpers/FormatApiError';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { IBotRepository } from '@/repositories/IBotRepository';

import { BotAuthenticateUseCase } from './BotAuthenticateUseCase';

export class BotTestUseCase {
  constructor(
    private botRepository: IBotRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async handle(botId: string, userId: string) {
    const bot = await this.botRepository.findByIdAndUserId(botId, userId);

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    const botApiToken = await this.botAuthenticateUseCase.authenticate();

    try {
      const response = await this.apiProvider.post(`/robot/${bot.botApiId}/test`, null, botApiToken);
      console.log(response);
    } catch (err) {
      const statusCode = err?.status || 500;
      const messageFormatted = formatApiErrorMessage(err?.data?.errorCode);
      const message = messageFormatted || 'internal-server-error';
      throw new HttpRequestException(message, statusCode);
    }
  }
}
