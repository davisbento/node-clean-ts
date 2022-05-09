import { IController } from '@/interfaces/IController';
import { IHttpRequest } from '@/interfaces/IHttp';

import { InvoicePurchaseUseCase } from '../usecases/InvoicePurchaseUseCase';

export class InvoicePurchaseController implements IController {
  constructor(private invoicePurchaseUseCase: InvoicePurchaseUseCase) {}

  public async handle(httpRequest: IHttpRequest) {
    const data = await this.invoicePurchaseUseCase.purchase(
      httpRequest.body.id,
      httpRequest.body.type,
      httpRequest.userId
    );

    return {
      data,
      statusCode: 200
    };
  }
}
