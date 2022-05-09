import { IValidAddress } from '@/interfaces/IBtc';

export interface IBtcRpcProvider {
  getNewAddress(): Promise<string>;
  getReceivedByAddress(address: string): Promise<number>;
  validateAddress(address: string): Promise<IValidAddress>;
}
