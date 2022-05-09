import { IController } from '@/interfaces/IController';
import { IHttpResponse } from '@/interfaces/IHttp';

import { SubscriptionListUseCase } from '../usecases/SubscriptionListUseCase';

export class SubscriptionListController implements IController {
  constructor(private readonly subscriptionListUseCase: SubscriptionListUseCase) {}

  public async handle(): Promise<IHttpResponse> {
    const data = await this.subscriptionListUseCase.getAll();

    return {
      data,
      statusCode: 200
    };
  }
}
