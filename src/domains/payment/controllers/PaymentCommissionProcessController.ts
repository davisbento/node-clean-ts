import { IController } from '@/interfaces/IController';

import { PaymentCommissionProcessUseCase } from '../usecases/PaymentCommissionProcessUseCase';

export class PaymentCommissionProcessController implements IController {
  constructor(private paymentCommissionProcessUseCase: PaymentCommissionProcessUseCase) {}

  public async handle() {
    this.paymentCommissionProcessUseCase.process();

    return {
      data: {
        ok: true
      },
      statusCode: 200
    };
  }
}
