import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { BotCreateUseCase } from '../usecases/BotCreateUseCase';

export class BotCreateController implements IController {
  constructor(private readonly botCreateUseCase: BotCreateUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.botCreateUseCase.create(request.body, request.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
