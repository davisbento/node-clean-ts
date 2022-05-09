import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { ExchangeListByUserUseCase } from '../usecases/ExchangeListByUserUseCase';

export class ExchangeListByUserController implements IController {
  constructor(private readonly exchangesCreateUseCase: ExchangeListByUserUseCase) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.exchangesCreateUseCase.getByUserId(httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
