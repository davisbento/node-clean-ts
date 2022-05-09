import { Address } from '@/entities/Address';
import { IAddress } from '@/interfaces/IAddress';

import { IAddressRepository } from '../IAddressRepository';

export class DbAddressRepository implements IAddressRepository {
  constructor(private readonly addressModel: typeof Address) {}

  public async save(address: string): Promise<IAddress> {
    const newAddress = new Address({ address });
    await newAddress.save();

    return newAddress;
  }

  public async getAndUseLastAddress(): Promise<string> {
    const [lastAddress] = await this.addressModel.aggregate([{ $match: { used: false } }, { $sample: { size: 1 } }]);

    if (!lastAddress) {
      return null;
    }

    try {
      const address: IAddress = await this.addressModel.findById(lastAddress._id);

      if (!address) {
        return null;
      }

      address.used = true;
      address.usedAt = new Date();

      await address.save();

      return address.address;
    } catch (err) {
      console.log(err, 'getAndUseLastAddress');
      throw new Error(err);
    }
  }
}
