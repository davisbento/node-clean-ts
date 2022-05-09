import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { BotListUseCase } from '../usecases/BotListUseCase';

export class BotListController implements IController {
  constructor(private readonly botListUseCase: BotListUseCase) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.botListUseCase.getAll(httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
