import UnauthorizedException from '@/exceptions/UnauthoziredException';
import { ICryptProvider } from '@/infra/cryptography/ICryptProvider';
import { IJwtProvider } from '@/infra/jwt/IJwtProvider';
import { ITwoFaProvider } from '@/infra/twofa/ITwoFaProvider';
import { IUserRepository } from '@/repositories/IUserRepository';

import { IAUthenticateParams } from '../validation/AuthenticateDTO';

export class AuthenticateUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptProvider: ICryptProvider,
    private jwtProvider: IJwtProvider,
    private twoFaProvider: ITwoFaProvider
  ) {}

  public async authenticate({ email, password, otpCode }: IAUthenticateParams) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isSamePassword = await this.cryptProvider.comparePass(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user?.otpActive && !otpCode) {
      throw new UnauthorizedException('request-otp-code');
    }

    if (user?.otpActive) {
      const isValid = this.twoFaProvider.verifySecret(user.otpSecret, otpCode);

      if (!isValid) {
        throw new UnauthorizedException('Invalid Two FA secret');
      }
    }

    const token = await this.jwtProvider.generateToken(user.id);

    return {
      token
    };
  }
}
