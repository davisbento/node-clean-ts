import { IJwtProvider } from '@/infra/jwt/IJwtProvider';
import { IHttpResponse } from '@/interfaces/IHttp';
import { IMiddleware } from '@/interfaces/IMiddleware';

interface ITokenMiddlewareRequest {
  accessToken: string;
}

export class TokenMiddleware implements IMiddleware<ITokenMiddlewareRequest> {
  constructor(private jwtProvider: IJwtProvider) {}

  public async handle(httpRequest: ITokenMiddlewareRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.accessToken;

    if (!accessToken) {
      return {
        data: { message: 'Token not found' },
        statusCode: 403
      };
    }

    try {
      const userId = await this.jwtProvider.verifyToken(accessToken);

      return {
        data: userId,
        statusCode: 200
      };
    } catch (err) {
      return {
        data: { message: 'Token expired' },
        statusCode: 403
      };
    }
  }
}
