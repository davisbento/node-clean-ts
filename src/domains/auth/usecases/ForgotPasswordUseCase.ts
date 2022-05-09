import { forgotPasswordTemplate } from '@/emailtemplates/ForgotPasswordTemplate';
import NotFoundException from '@/exceptions/NotFoundException';
import { generatePwd } from '@/helpers/GenerateStrongPassword';
import { ICryptProvider } from '@/infra/cryptography/ICryptProvider';
import { IMailProvider } from '@/infra/mail/IMailProvider';
import { IUserRepository } from '@/repositories/IUserRepository';

import { IForgotPasswordParams } from '../validation/ForgotPasswordDTO';

export class ForgotPasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider,
    private cryptProvider: ICryptProvider
  ) {}

  public async forgotPassword({ email }: IForgotPasswordParams) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // if (!user.emailConfirm) {
    //   throw new BadRequestException('Please, confirm your e-mail before continue');
    // }

    const strongPassword = generatePwd();

    const hashedPassword = await this.cryptProvider.hashPassword(strongPassword);

    await this.userRepository.updateUser(user.id, { password: hashedPassword });

    this.mailProvider.sendMail({
      to: email,
      subject: 'New Password',
      text: null,
      html: forgotPasswordTemplate(strongPassword)
    });

    return { message: 'E-mail sent' };
  }
}
