import { ITwoFAGenerate } from '@/interfaces/ITwoFa';

export interface ITwoFaProvider {
  generateSecret(name: string): ITwoFAGenerate;
  verifySecret(userSecret: string, otpCode: string): boolean;
}
