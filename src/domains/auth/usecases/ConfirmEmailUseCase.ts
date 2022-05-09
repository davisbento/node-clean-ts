import NotFoundException from '@/exceptions/NotFoundException';
import { IRedisProvider } from '@/infra/redis/IRedisProvider';
import { IUserRepository } from '@/repositories/IUserRepository';

import { IConfirmEmail } from '../validation/AuthenticateDTO';

export class ConfirmEmailUseCase {
  private redisPrefix = 'emailToken';

  constructor(private userRepository: IUserRepository, private redisClient: IRedisProvider) {}

  public async confirmEmail({ token: emailToken }: IConfirmEmail) {
    const userEmail = await this.redisClient.retrieve(`${this.redisPrefix}-${emailToken}`);

    if (!userEmail) {
      throw new NotFoundException('Token not found or expired');
    }

    const user = await this.userRepository.getByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.updateUser(user.id, { emailConfirm: true });

    await this.redisClient.delete(`${this.redisPrefix}-${emailToken}`);

    return true;
  }
}
