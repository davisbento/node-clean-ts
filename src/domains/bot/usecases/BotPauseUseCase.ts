import InternalServerError from '@/exceptions/InternalServerError';
import NotFoundException from '@/exceptions/NotFoundException';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { EnBotStatus } from '@/interfaces/IBot';
import { IBotRepository } from '@/repositories/IBotRepository';

import { BotAuthenticateUseCase } from './BotAuthenticateUseCase';

export class BotPauseUseCase {
  constructor(
    private botRepository: IBotRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async pause(botId: string, userId: string) {
    const bot = await this.botRepository.findByIdAndUserId(botId, userId);

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    const botApiToken = await this.botAuthenticateUseCase.authenticate();

    try {
      await this.apiProvider.post(`/robot/pause?robotId=${bot.botApiId}`, null, botApiToken);

      await this.botRepository.updateBot(bot._id, { status: EnBotStatus.paused });
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}
