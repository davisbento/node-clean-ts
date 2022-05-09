import { APP_NAME } from '@/config/settings';
import { ITwoFAGenerate } from '@/interfaces/ITwoFa';
import * as twoFactor from 'node-2fa';

import { ITwoFaProvider } from '../ITwoFaProvider';

export class TwoFaProvider implements ITwoFaProvider {
  public generateSecret(name: string): ITwoFAGenerate {
    return twoFactor.generateSecret({ name: APP_NAME, account: name });
  }

  public verifySecret(userSecret: string, otpCode: string): boolean {
    const isValid2Fa = twoFactor.verifyToken(userSecret, otpCode);

    if (!isValid2Fa) {
      return false;
    }

    if (isValid2Fa.delta > 0) {
      return false;
    }

    if (isValid2Fa.delta < 0) {
      return false;
    }

    return true;
  }
}
