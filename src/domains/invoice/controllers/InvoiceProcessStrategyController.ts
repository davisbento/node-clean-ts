import { IController } from '@/interfaces/IController';

import { InvoiceProcessStrategyUseCase } from '../usecases/InvoiceProcessStrategyUseCase';

export class InvoiceProcessStrategyController implements IController {
  constructor(private invoiceProcessUseCase: InvoiceProcessStrategyUseCase) {}

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
