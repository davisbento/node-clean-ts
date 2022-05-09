import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { BotTestUseCase } from '../usecases/BotTestUseCase';

export class BotTestController implements IController {
  constructor(private readonly botTestUseCase: BotTestUseCase) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.botTestUseCase.handle(httpRequest.body.id, httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
