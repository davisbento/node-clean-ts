import BadRequestException from '@/exceptions/BadRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { ITwoFaProvider } from '@/infra/twofa/ITwoFaProvider';
import { IUserRepository } from '@/repositories/IUserRepository';

import { IActiveFa } from '../validation/ActiveFaDTO';

export class ActiveFaUseCase {
  constructor(private userRepository: IUserRepository, private twoFaProvider: ITwoFaProvider) {}

  public async activeFa(userId: string, model: IActiveFa) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValid = this.twoFaProvider.verifySecret(user.otpSecret, model.secret);

    if (!isValid) {
      throw new BadRequestException('Invalid secret');
    }

    await this.userRepository.updateUser(user.id, { otpActive: true });

    return {
      message: '2FA activated'
    };
  }
}
