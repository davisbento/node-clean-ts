import { BtcRpcProvider } from '@/infra/bitcoinrpc/implementations/BtcRpcProvider';
import { IController } from '@/interfaces/IController';

import { NewAddressController } from '../controllers/NewAddressController';
import { NewAddresUseCase } from '../usecases/NewAddressUseCase';
import { makeAddressDbFactory } from './AddressDbFactory';

export const makeNewAddressController = (): IController => {
  const btcRpcProvider = new BtcRpcProvider();
  const addressRepository = makeAddressDbFactory();
  const newAddressUseCase = new NewAddresUseCase(addressRepository, btcRpcProvider);
  const newAddressController = new NewAddressController(newAddressUseCase);

  return newAddressController;
};
