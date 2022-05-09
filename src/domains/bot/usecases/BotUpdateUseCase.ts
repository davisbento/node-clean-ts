import { ASSET_BASE_ID, ASSET_QUOTE_ID, EXCHANGE_ID } from '@/config/settings';
import HttpRequestException from '@/exceptions/HttpRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { formatApiErrorMessage } from '@/helpers/FormatApiError';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { IBot, IBotPayload } from '@/interfaces/IBot';
import { IBotApiReturn } from '@/interfaces/IBotCreate';
import { IBotRepository } from '@/repositories/IBotRepository';

import { IUpdateBot } from '../validation/UpdateBotDTO';
import { BotAuthenticateUseCase } from './BotAuthenticateUseCase';

export class BotUpdateUseCase {
  constructor(
    private botRepository: IBotRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async update(model: IUpdateBot, userId: string) {
    const bot = await this.botRepository.findByIdAndUserId(model.id, userId);

    if (!bot) {
      throw new NotFoundException('Bot not found');
    }

    try {
      const botApiToken = await this.botAuthenticateUseCase.authenticate();

      const { payload, fieldsToUpdate } = await this.prepareData(model, bot);

      const response = await this.apiProvider.put<IBotApiReturn>('/robot', payload, botApiToken);

      fieldsToUpdate.botApiReturn = { ...response };

      await this.botRepository.updateBot(bot._id, fieldsToUpdate);

      return {
        message: 'Bot updated successfully'
      };
    } catch (err) {
      const statusCode = err?.status || 500;
      const messageFormatted = formatApiErrorMessage(err?.data?.errorCode);
      const message = messageFormatted || 'internal-server-error';
      throw new HttpRequestException(message, statusCode);
    }
  }

  private async prepareData(model: IUpdateBot, bot: IBot) {
    const payload: IBotPayload = {
      assetBaseId: ASSET_BASE_ID,
      assetQuoteId: ASSET_QUOTE_ID,
      id: bot.botApiId,
      credentials: {
        apiKey: null,
        apiSecret: null
      },
      exchangeId: EXCHANGE_ID
    };

    const fieldsToUpdate: Partial<IBot> = {};

    if (model.key) {
      payload.credentials.apiKey = model.key;
    }

    if (model.secret) {
      payload.credentials.apiSecret = model.secret;
    }

    if (model.name) {
      fieldsToUpdate.name = model.name;
    }

    return { payload, fieldsToUpdate };
  }
}
