import BadRequestException from '@/exceptions/BadRequestException';
import InternalServerError from '@/exceptions/InternalServerError';
import { IBtcRpcProvider } from '@/infra/bitcoinrpc/IBtcRpcProvider';
import { IAddressRepository } from '@/repositories/IAddressRepository';

export class NewAddresUseCase {
  constructor(private addressRepository: IAddressRepository, private btcRpcProvider: IBtcRpcProvider) {}

  public async newAddress(): Promise<void> {
    try {
      const address = await this.btcRpcProvider.getNewAddress();
      const validate = await this.btcRpcProvider.validateAddress(address);

      if (!validate.isvalid) {
        throw new BadRequestException(`${address} not valid`);
      }

      await this.addressRepository.save(address);
    } catch (err) {
      throw new InternalServerError(err);
    }
  }
}
