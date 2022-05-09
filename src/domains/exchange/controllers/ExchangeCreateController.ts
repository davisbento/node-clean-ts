import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { ExchangeCreateUseCase } from '../usecases/ExchangesCreateUseCase';

export class ExchangeCreateController implements IController {
  constructor(private readonly exchangesCreateUseCase: ExchangeCreateUseCase) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.exchangesCreateUseCase.create(httpRequest.body, httpRequest.userId);

    return {
      data: { ok: true },
      statusCode: 200
    };
  }
}
