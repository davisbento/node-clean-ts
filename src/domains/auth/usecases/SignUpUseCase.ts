import BadRequestException from '@/exceptions/BadRequestException';
import { phoneFormat } from '@/helpers/PhoneFormat';
import { ICryptProvider } from '@/infra/cryptography/ICryptProvider';
import { IJwtProvider } from '@/infra/jwt/IJwtProvider';
import { ITwoFaProvider } from '@/infra/twofa/ITwoFaProvider';
import { IUserRepository } from '@/repositories/IUserRepository';

import { ISignUpParams } from '../validation/SignUpDTO';

export class SignUpUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptProvider: ICryptProvider,
    private jwtProvider: IJwtProvider,
    private twoFaProvider: ITwoFaProvider
  ) {}

  public async SignUp({ name, email, password, phone = '', sponsor }: ISignUpParams) {
    const user = await this.userRepository.getByEmail(email);

    if (user) {
      throw new BadRequestException('E-mail already exists');
    }

    const userSponsorId = await this.getSponsorId(sponsor);

    const hashedPassword = await this.cryptProvider.hashPassword(password);

    const secret = this.twoFaProvider.generateSecret(name);

    const newUser = await this.userRepository.saveUser({
      name,
      email,
      userSponsorId,
      phone: phoneFormat(phone),
      password: hashedPassword,
      otpImageUrl: secret.qr,
      otpSecret: secret.secret
    });

    const token = await this.jwtProvider.generateToken(newUser._id);

    return {
      token
    };
  }

  private async getSponsorId(sponsor: string) {
    if (!sponsor) {
      return null;
    }

    const userSponsor = await this.userRepository.getByIdentificator(sponsor);
    if (!userSponsor) {
      throw new BadRequestException('Sponsor not found');
    }

    return userSponsor._id;
  }
}
