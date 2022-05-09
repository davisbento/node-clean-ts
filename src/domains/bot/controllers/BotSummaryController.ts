import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { BotSummaryUseCase } from '../usecases/BotSummaryUseCase';

export class BotSummaryController implements IController {
  constructor(private readonly botSummaryUseCase: BotSummaryUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.botSummaryUseCase.summary(request.params.id, request.userId, request.query);

    return {
      data,
      statusCode: 200
    };
  }
}
