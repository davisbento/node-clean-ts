import NotFoundException from '@/exceptions/NotFoundException';
import { IUser } from '@/interfaces/IUser';
import { IUserRepository } from '@/repositories/IUserRepository';

export class GetProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  public async getProfile(userId: string) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      name: user.name,
      email: user.email.toLowerCase(),
      otpSecret: user.otpSecret,
      otpImageUrl: user.otpImageUrl,
      otpActive: user.otpActive,
      subscription: this.getSubscription(user),
      hasOverdueSubscription: !(user?.subscription?._id && (user?.hasPaiedSubscription || false)),
      hasPaiedSubscription: user?.hasPaiedSubscription || false,
      paymentMethods: user?.paymentMethods ? user.paymentMethods.filter(item => item.isDefault) : [],
      identificator: user.identificator
    };
  }

  private getSubscription(user: IUser) {
    const subscription = { ...user.subscription };

    if (!subscription) {
      return null;
    }

    return {
      name: subscription.name,
      id: subscription._id
    };
  }
}
