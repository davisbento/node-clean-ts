import { IController } from '@/interfaces/IController';

import { PaymentSubscriptionProcessUseCase } from '../usecases/PaymentSubscriptionProcessUseCase';

export class PaymentSubscriptionProcessController implements IController {
  constructor(private paymentSubscriptionProcessUseCase: PaymentSubscriptionProcessUseCase) {}

  public async handle() {
    this.paymentSubscriptionProcessUseCase.process();

    return {
      data: {
        ok: true
      },
      statusCode: 200
    };
  }
}
