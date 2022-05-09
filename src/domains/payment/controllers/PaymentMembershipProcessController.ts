import { IController } from '@/interfaces/IController';

import { PaymentMembershipProcessUseCase } from '../usecases/PaymentMembershipProcessUseCase';

export class PaymentMembershipProcessController implements IController {
  constructor(private paymentMembershipProcessUseCase: PaymentMembershipProcessUseCase) {}

  public async handle() {
    this.paymentMembershipProcessUseCase.process();

    return {
      data: {
        ok: true
      },
      statusCode: 200
    };
  }
}
