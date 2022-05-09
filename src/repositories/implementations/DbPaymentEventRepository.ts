import { PaymentEvent } from '@/entities/PaymentEvent';
import { EnPaymentType, IPaymentEvent, IPaymentEventGenerate, IPaymentLogs } from '@/interfaces/IPaymentEvent';

import { IPaymentEventRepository } from '../IPaymentEventRepository';

export class DbPaymentEventRepository implements IPaymentEventRepository {
  constructor(private readonly paymentEventModel: typeof PaymentEvent) {}

  public async setNextCharge(id: string, newDate: Date, log: IPaymentLogs): Promise<void> {
    const payment: IPaymentEvent = await this.paymentEventModel.findById(id);

    if (!payment) {
      return;
    }

    payment.chargeDate = newDate;
    payment.logs.push(log);
    await payment.save();

    return;
  }

  public cancelOldSubscriptionsByUserId(userId: string) {
    return this.paymentEventModel.updateMany({ userId }, { active: false });
  }

  public async saveEvent(params: IPaymentEventGenerate): Promise<IPaymentEvent> {
    const payment = new PaymentEvent({ ...params });

    const response = await payment.save();

    return response;
  }

  public async getPaymentsMembershipToProcess(): Promise<IPaymentEvent[]> {
    return this.paymentEventModel.find({
      chargeDate: { $lte: new Date() },
      active: true,
      paymentType: { $eq: EnPaymentType.membership }
    });
  }
  public async getPaymentsCommissionToProcess(): Promise<IPaymentEvent[]> {
    return this.paymentEventModel.find({
      chargeDate: { $lte: new Date() },
      active: true,
      paymentType: { $eq: EnPaymentType.performanceCommission }
    });
  }

  public async getPaymentsSubscriptionToProcess(): Promise<IPaymentEvent[]> {
    return this.paymentEventModel.find({
      chargeDate: { $lte: new Date() },
      active: true,
      paymentType: { $eq: EnPaymentType.subscription }
    });
  }
}
