import { IController } from '@/interfaces/IController';

import { InvoiceProcessOverdueUseCase } from '../usecases/InvoiceProcessOverdueUseCase';

export class InvoiceProcessOverdueController implements IController {
  constructor(private invoiceProcessUseCase: InvoiceProcessOverdueUseCase) {}

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
