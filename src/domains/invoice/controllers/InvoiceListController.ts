import { IController } from '@/interfaces/IController';
import { IHttpRequest } from '@/interfaces/IHttp';

import { InvoiceListUseCase } from '../usecases/InvoiceListUseCase';

export class InvoiceListController implements IController {
  constructor(private invoiceListUseCase: InvoiceListUseCase) {}

  public async handle(httpRequest: IHttpRequest) {
    const data = await this.invoiceListUseCase.list(httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
