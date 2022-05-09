export interface ICryptProvider {
  hashPassword(plainText: string): Promise<string>;
  comparePass(plainText: string, userHashPassword: string): Promise<boolean>;
}
