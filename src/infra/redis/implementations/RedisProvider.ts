import { REDIS_HOST, REDIS_PORT } from '@/config/settings';
import RedisClient, { Redis } from 'ioredis';

import { IRedisProvider } from '../IRedisProvider';

const redisOptions = {
  port: Number(REDIS_PORT),
  host: REDIS_HOST
};

export class RedisProvider implements IRedisProvider {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new RedisClient(redisOptions);
  }

  public persist(key: string, value: string, expInMinutes: number): Promise<'OK'> {
    return this.redisClient.set(key, value, 'EX', 60 * expInMinutes);
  }

  public delete(key: string): Promise<number> {
    return this.redisClient.del(key);
  }

  public retrieve(key: string): Promise<string> {
    return this.redisClient.get(key);
  }
}
