import BadRequestException from '@/exceptions/BadRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { IuguProvider } from '@/infra/iugu/implementations/IuguProvider';
import { IInvoiceRepository } from '@/repositories/IInvoiceRepository';
import { IUserRepository } from '@/repositories/IUserRepository';

import { ICreateSubscriptionByCard } from '../validation/CreateSubscriptionByCardDTO';

export class CreateSubscriptionByCardUseCase {
  constructor(
    private userRepository: IUserRepository,
    private invoiceRepository: IInvoiceRepository,
    private iuguProvider: IuguProvider
  ) {}

  public async createSubscription(userId: string, model: ICreateSubscriptionByCard) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let customerId = user?.paymentGatewayUserId || null;

    if (!customerId) {
      const customer = await this.iuguProvider.createCustomer(user.name, user.email);
      customerId = customer.id;
      await this.userRepository.updateUser(userId, { paymentGatewayUserId: customerId });
    }

    try {
      const response = await this.iuguProvider.createSubscription(model.subscriptionId, customerId, model.invoiceId);

      if (response?.id) {
        await this.invoiceRepository.markAsAwaitingConfirmation(
          model.invoiceId,
          response.recent_invoices[0].id,
          response.recent_invoices[0].secure_url
        );
      } else {
        throw 'Erro ao criar assinatura';
      }

      return {
        id: response.id,
        secureUrl: response.recent_invoices[0].secure_url
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
