import BadRequestException from '@/exceptions/BadRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { addMoreHours } from '@/helpers/Date';
import { ICoinbaseProvider } from '@/infra/coinbase/ICoinbaseProvider';
import { IIuguProvider } from '@/infra/iugu/IIuguProvider';
import { EnChargeType } from '@/interfaces/ICoinbase';
import { EnInvoiceStatus, EnInvoiceType, IInvoiceGenerate } from '@/interfaces/IInvoice';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { ISubscriptionRepository } from '@/repositories/ISubscriptionRepository';
import { IUserRepository } from '@/repositories/IUserRepository';

import { IUpgradeInvoiceModel } from '../validation/InvoiceUpgradeDTO';

export class InvoiceUpgradeUseCase {
  constructor(
    private invoiceRepository: IInvoiceRepository,
    private userRepositiory: IUserRepository,
    private subscriptionRepository: ISubscriptionRepository,
    private coinbaseProvider: ICoinbaseProvider,
    private iuguProvider: IIuguProvider
  ) {}

  public async upgrade(model: IUpgradeInvoiceModel, userId: string): Promise<{ message: string }> {
    try {
      const { subscriptionId } = model;

      const newSubscription = await this.subscriptionRepository.getById(subscriptionId);

      if (!newSubscription) {
        throw new NotFoundException('Subscription not found');
      }

      const user = await this.userRepositiory.getById(userId);

      if (!user || !user.subscription) {
        throw new NotFoundException('User not found');
      }

      const iuguSubscription = await this.iuguProvider.upgradePlan(user.iuguSubscriptionId, subscriptionId);

      const newValue = iuguSubscription.price;

      const response = await this.coinbaseProvider.createCharge(
        EnChargeType.strategyPurchase,
        newValue,
        newSubscription.currency
      );

      const newInvoice: IInvoiceGenerate = {
        subscriptionId: newSubscription._id,
        subscription: newSubscription,
        priceFiat: newValue,
        userId,
        status: iuguSubscription.status === 'paid' ? EnInvoiceStatus.completed : EnInvoiceStatus.awaitingConfirmation,
        paid: iuguSubscription.status === 'paid',
        paidAt: iuguSubscription.status === 'paid' ? new Date() : null,
        expiresAt: addMoreHours(36),
        currency: newSubscription.currency,
        type: EnInvoiceType.subscriptionUpgrade,
        idIugu: iuguSubscription.iuguInvoiceId,
        secureUrl: iuguSubscription.secureUrl,
        addresses: response.addresses,
        pricing: response.pricing,
        metadata: { ...response },
        isFirstInvoice: false
      };

      await this.invoiceRepository.saveInvoice(newInvoice);

      return {
        message: 'Invoice generated'
      };
    } catch (err) {
      throw new BadRequestException(err?.message || 'Internal Server Error');
    }
  }
}
