import BadRequestException from '@/exceptions/BadRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { IuguProvider } from '@/infra/iugu/implementations/IuguProvider';
import { IUserRepository } from '@/repositories/IUserRepository';

import { ICreatePaymentMethod } from '../validation/CreatePaymentMethodDTO';

export class CreatePaymentMethodUseCase {
  constructor(private userRepository: IUserRepository, private iuguProvider: IuguProvider) {}

  public async createPaymentMethod(userId: string, model: ICreatePaymentMethod) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let customerId = user?.paymentGatewayUserId || null;

    if (!customerId) {
      const response = await this.iuguProvider.createCustomer(user.name, user.email);
      customerId = response.id;
      await this.userRepository.updateUser(userId, { paymentGatewayUserId: customerId });
    }

    try {
      const paymentResponse = await this.iuguProvider.createPaymentMethod(
        customerId,
        'Cartão Klug Capital',
        model.cardToken
      );

      await this.userRepository.addPaymentMethod(userId, model.cardToken, paymentResponse);

      return paymentResponse;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
