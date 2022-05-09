import BadRequestException from '@/exceptions/BadRequestException';
import InternalServerError from '@/exceptions/InternalServerError';
import NotFoundException from '@/exceptions/NotFoundException';
import { addMoreHours } from '@/helpers/Date';
import { ICoinbaseProvider } from '@/infra/coinbase/ICoinbaseProvider';
import { EnChargeType } from '@/interfaces/ICoinbase';
import { EnInvoiceType, IInvoiceGenerate } from '@/interfaces/IInvoice';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IStrategyRepository } from '@/repositories/IStrategyRepository';
import { ISubscriptionRepository } from '@/repositories/ISubscriptionRepository';
import { IUserRepository } from '@/repositories/IUserRepository';
import { IVoucherRepository } from '@/repositories/IVoucherRepository';

export class InvoicePurchaseUseCase {
  constructor(
    private invoiceRepository: IInvoiceRepository,
    private strategyRepository: IStrategyRepository,
    private voucherRepository: IVoucherRepository,
    private userRepository: IUserRepository,
    private subscriptionRepository: ISubscriptionRepository,
    private coinbaseProvider: ICoinbaseProvider
  ) {}

  public async purchase(id: string, type: EnInvoiceType, userId: string): Promise<{ message: string }> {
    try {
      if (type === EnInvoiceType.strategyPurchase) {
        return await this.generateStrategyInvoice(id, userId);
      }

      if (type === EnInvoiceType.subscriptionPurchase) {
        return await this.generateSubscriptionInvoice(id, userId);
      }
    } catch (err) {
      throw new InternalServerError(err);
    }
  }

  private async generateStrategyInvoice(id: string, userId: string) {
    const strategy = await this.strategyRepository.getByIdWithoutRevenues(id);

    if (!strategy) {
      throw new NotFoundException('Strategy not found');
    }

    if (strategy.membershipPrice === 0) {
      await this.voucherRepository.createManyVoucher(1, userId, strategy);

      await this.userRepository.addStrategy(userId, {
        strategy
      });

      return {
        message: 'Invoice generated'
      };
    }

    const response = await this.coinbaseProvider.createCharge(
      EnChargeType.strategyPurchase,
      strategy.membershipPrice,
      strategy.currency
    );

    const newInvoice: IInvoiceGenerate = {
      strategyId: strategy._id,
      priceFiat: strategy.membershipPrice,
      strategy,
      userId,
      expiresAt: addMoreHours(36),
      currency: strategy.currency,
      type: EnInvoiceType.strategyPurchase,
      addresses: response.addresses,
      pricing: response.pricing,
      metadata: { ...response },
      isFirstInvoice: true
    };

    await this.invoiceRepository.saveInvoice(newInvoice);

    return {
      message: 'Invoice generated'
    };
  }

  private async generateSubscriptionInvoice(id: string, userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.subscription) {
      throw new BadRequestException('User already has a subscription');
    }

    const subscription = await this.subscriptionRepository.getById(id);

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const response = await this.coinbaseProvider.createCharge(
      EnChargeType.strategyPurchase,
      subscription.value,
      subscription.currency
    );

    const newInvoice: IInvoiceGenerate = {
      subscriptionId: subscription._id,
      subscription,
      priceFiat: subscription.value,
      userId,
      expiresAt: addMoreHours(36),
      currency: subscription.currency,
      type: EnInvoiceType.subscriptionPurchase,
      addresses: response.addresses,
      pricing: response.pricing,
      metadata: { ...response },
      isFirstInvoice: true
    };

    await this.invoiceRepository.saveInvoice(newInvoice);

    return {
      message: 'Invoice generated'
    };
  }
}
