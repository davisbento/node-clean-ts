import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { BotUpdateUseCase } from '../usecases/BotUpdateUseCase';

export class BotUpdateController implements IController {
  constructor(private readonly botUpdateUseCase: BotUpdateUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.botUpdateUseCase.update(request.body, request.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
