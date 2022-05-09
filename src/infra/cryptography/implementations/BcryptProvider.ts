import { hash, compare } from 'bcryptjs';
import { ICryptProvider } from '../ICryptProvider';

export class BcryptProvider implements ICryptProvider {
  public hashPassword(plainText: string) {
    return hash(plainText, 10);
  }

  public comparePass(plainText: string, userHashPassword: string) {
    return compare(plainText, userHashPassword);
  }
}
