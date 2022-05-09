import { BOT_API_PASS, BOT_API_USER } from '@/config/settings';
import UnauthorizedException from '@/exceptions/UnauthoziredException';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { IRedisProvider } from '@/infra/redis/IRedisProvider';

export class BotAuthenticateUseCase {
  private cacheKey = 'authToken';

  constructor(private redisProvider: IRedisProvider, private apiProvider: IApiProvider) {}

  public async authenticate(): Promise<string> {
    const payload = {
      username: BOT_API_USER,
      password: BOT_API_PASS
    };

    const tokenFromCache = await this.redisProvider.retrieve(this.cacheKey);

    if (tokenFromCache) {
      return tokenFromCache;
    }

    const response = await this.apiProvider.post<{ token: string }>('/authenticate', payload);

    if (!response.token) {
      console.log('authenticateBotApi', response);
      throw new UnauthorizedException('Unauthorized access to bot api');
    }

    await this.redisProvider.persist('authToken', response.token, 15);

    return response.token;
  }
}
