import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { CreatePaymentMethodUseCase } from '../usecases/CreatePaymentMethodUseCase';

export class CreatePaymentMethodController implements IController {
  constructor(private createPaymentMethodUseCase: CreatePaymentMethodUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.createPaymentMethodUseCase.createPaymentMethod(request.userId, request.body);

    return {
      data,
      statusCode: 200
    };
  }
}
