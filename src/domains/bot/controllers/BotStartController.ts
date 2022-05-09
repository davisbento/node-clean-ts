import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { BotStartUseCase } from '../usecases/BotStartUseCase';

export class BotStartController implements IController {
  constructor(private readonly botStartUseCase: BotStartUseCase) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.botStartUseCase.start(httpRequest.body.id, httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
