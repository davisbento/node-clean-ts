import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { BotPauseUseCase } from '../usecases/BotPauseUseCase';

export class BotPauseController implements IController {
  constructor(private readonly botPauseUseCase: BotPauseUseCase) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.botPauseUseCase.pause(httpRequest.body.id, httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
