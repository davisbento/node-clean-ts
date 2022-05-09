import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { CreateSubscriptionByCardUseCase } from '../usecases/CreateSubscriptionByCardUseCase';

export class CreateSubscriptionByCardController implements IController {
  constructor(private createSubscriptionByCardUseCase: CreateSubscriptionByCardUseCase) {}
  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.createSubscriptionByCardUseCase.createSubscription(request.userId, request.body);

    return {
      data,
      statusCode: 200
    };
  }
}
