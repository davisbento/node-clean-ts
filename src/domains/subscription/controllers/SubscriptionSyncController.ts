import { IController } from '@/interfaces/IController';
import { IHttpResponse } from '@/interfaces/IHttp';

import { SubscriptionSyncUseCase } from '../usecases/SubscriptionSyncUseCase';

export class SubscriptionSyncController implements IController {
  constructor(private readonly subscriptionSyncUseCase: SubscriptionSyncUseCase) {}

  public async handle(): Promise<IHttpResponse> {
    const data = await this.subscriptionSyncUseCase.syncPlans();

    return {
      data,
      statusCode: 200
    };
  }
}
