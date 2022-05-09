import { User } from '@/entities/User';
import { DbUserRepository } from '@/repositories/implementations/DbUserRepository';

export const makeUserDb = () => {
  const userRepository = new DbUserRepository(User);

  return userRepository;
};
