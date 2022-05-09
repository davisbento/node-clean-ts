import { ASSET_BASE_ID, ASSET_QUOTE_ID, EXCHANGE_ID } from '@/config/settings';
import HttpRequestException from '@/exceptions/HttpRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { addMoreDays } from '@/helpers/Date';
import { formatApiErrorMessage } from '@/helpers/FormatApiError';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { EnBotStatus, IBotPayload } from '@/interfaces/IBot';
import { IBotApiReturn } from '@/interfaces/IBotCreate';
import { EnPaymentType } from '@/interfaces/IPaymentEvent';
import { IBotRepository } from '@/repositories/IBotRepository';
import { IPaymentEventRepository } from '@/repositories/IPaymentEventRepository';
import { IStrategyRepository } from '@/repositories/IStrategyRepository';
import { IVoucherRepository } from '@/repositories/IVoucherRepository';
import { Types } from 'mongoose';

import { ICreateBot } from '../validation/CreateBotDTO';
import { BotAuthenticateUseCase } from './BotAuthenticateUseCase';

export class BotCreateUseCase {
  constructor(
    private botRepository: IBotRepository,
    private strategyRepository: IStrategyRepository,
    private voucherRepository: IVoucherRepository,
    private paymentEventRepository: IPaymentEventRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async create(model: ICreateBot, userId: string) {
    const strategy = await this.strategyRepository.getById(model.strategyId);

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    if (!strategy.operationsActivated) {
      throw new NotFoundException('Strategy not available, please select another strategy');
    }

    const voucher = await this.voucherRepository.getByUserIdAndStrategyId(userId, strategy._id);

    if (!voucher) {
      throw new NotFoundException('Voucher not found');
    }

    const botApiToken = await this.botAuthenticateUseCase.authenticate();

    const payload: IBotPayload = {
      assetBaseId: ASSET_BASE_ID,
      assetQuoteId: ASSET_QUOTE_ID,
      credentials: {
        apiKey: model.key,
        apiSecret: model.secret
      },
      exchangeId: EXCHANGE_ID,
      usdMarginLimit: voucher.strategy.usdMarginLimit,
      robotStatus: EnBotStatus.new,
      strategyId: strategy.strategyId,
      tags: ['klug']
    };

    try {
      const response = await this.apiProvider.post<IBotApiReturn>('/robot', payload, botApiToken);

      const newBot = {
        name: model.name,
        botApiId: response.id,
        userId: Types.ObjectId(userId),
        botApiReturn: { ...response },
        strategyId: Types.ObjectId(strategy._id),
        strategyName: strategy.name,
        status: response.robotStatus
      };

      await this.voucherRepository.markAsUsed(voucher._id);

      const botCreated = await this.botRepository.saveBot(newBot);

      if (strategy.commissionFrequency > 0) {
        await this.paymentEventRepository.saveEvent({
          strategyId: strategy._id,
          strategy,
          botId: botCreated._id,
          userId,
          paymentType: EnPaymentType.performanceCommission,
          chargeDate: addMoreDays(strategy.commissionFrequency)
        });
      }

      return newBot;
    } catch (err) {
      const statusCode = err?.status || 500;
      const messageFormatted = formatApiErrorMessage(err?.data?.errorCode);
      const message = messageFormatted || 'internal-server-error';
      throw new HttpRequestException(message, statusCode);
    }
  }
}
