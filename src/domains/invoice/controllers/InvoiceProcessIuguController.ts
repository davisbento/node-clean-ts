import { IController } from '@/interfaces/IController';

import { InvoiceProcessIuguUseCase } from '../usecases/InvoiceProcessIuguUseCase';

export class InvoiceProcessIuguController implements IController {
  constructor(private invoiceProcessIuguUseCase: InvoiceProcessIuguUseCase) {}

  public async handle() {
    const data = await this.invoiceProcessIuguUseCase.process();

    return {
      data,
      statusCode: 200
    };
  }
}
