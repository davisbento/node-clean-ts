import { IController } from '@/interfaces/IController';

import { InvoiceProcessSubscriptionUseCase } from '../usecases/InvoiceProcessSubscriptionUseCase';

export class InvoiceProcessSubscriptionController implements IController {
  constructor(private invoiceProcessUseCase: InvoiceProcessSubscriptionUseCase) {}

  public async handle() {
    this.invoiceProcessUseCase.process();

    return {
      data: {
        ok: true
      },
      statusCode: 200
    };
  }
}
