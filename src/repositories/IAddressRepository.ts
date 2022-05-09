import { IAddress } from '@/interfaces/IAddress';

export interface IAddressRepository {
  save(address: string): Promise<IAddress>;
  getAndUseLastAddress(): Promise<string>;
}
