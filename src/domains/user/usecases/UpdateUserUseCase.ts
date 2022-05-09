import BadRequestException from '@/exceptions/BadRequestException';
import NotFoundException from '@/exceptions/NotFoundException';
import { ICryptProvider } from '@/infra/cryptography/ICryptProvider';
import { IUserRepository } from '@/repositories/IUserRepository';

import { IUpdateUser } from '../validation/UpdateUserDTO';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository, private cryptProvider: ICryptProvider) {}

  public async updateUser(userId: string, model: IUpdateUser) {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fieldsToUpdate: any = {};

    if (model.phone) {
      fieldsToUpdate['phone'] = model.phone;
    }

    if (model.dob) {
      fieldsToUpdate['dob'] = new Date(model.dob);
    }

    if (model.password) {
      const compareOldPassword = await this.cryptProvider.comparePass(model.oldPassword, user.password);

      if (!compareOldPassword) {
        throw new BadRequestException('Old password doesnt match');
      }
      fieldsToUpdate['password'] = await this.cryptProvider.hashPassword(model.password);
    }

    await this.userRepository.updateUser(user.id, fieldsToUpdate);

    return {
      message: 'User updated'
    };
  }
}
