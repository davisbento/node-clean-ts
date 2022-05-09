import { RedisProvider } from '@/infra/redis/implementations/RedisProvider';

import { BotAuthenticateUseCase } from '../usecases/BotAuthenticateUseCase';
import { makeBotApi } from './BotApiFactory';

export const makeBotAuthenticateUseCase = () => {
  const apiProvider = makeBotApi();
  const redisProvider = new RedisProvider();
  const botAuthenticateUseCase = new BotAuthenticateUseCase(redisProvider, apiProvider);

  return botAuthenticateUseCase;
};
