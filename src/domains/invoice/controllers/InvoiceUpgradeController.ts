import { IController } from '@/interfaces/IController';
import { IHttpRequest } from '@/interfaces/IHttp';

import { InvoiceUpgradeUseCase } from '../usecases/InvoiceUpgradeUseCase';

export class InvoiceUpgradeController implements IController {
  constructor(private invoiceUpgradeUseCase: InvoiceUpgradeUseCase) {}

  public async handle(httpRequest: IHttpRequest) {
    const data = await this.invoiceUpgradeUseCase.upgrade(httpRequest.body, httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
