import { Address } from '@/entities/Address';
import { DbAddressRepository } from '@/repositories/implementations/DbAddressRepository';

export const makeAddressDbFactory = () => {
  const addressRepository = new DbAddressRepository(Address);

  return addressRepository;
};
