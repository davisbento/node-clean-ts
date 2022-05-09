import { IPaymentEvent, IPaymentEventGenerate, IPaymentLogs } from '@/interfaces/IPaymentEvent';

export interface IPaymentEventRepository {
  saveEvent(params: IPaymentEventGenerate): Promise<IPaymentEvent>;
  cancelOldSubscriptionsByUserId(userId: string): Promise<void>;
  getPaymentsMembershipToProcess(): Promise<IPaymentEvent[]>;
  getPaymentsCommissionToProcess(): Promise<IPaymentEvent[]>;
  getPaymentsSubscriptionToProcess(): Promise<IPaymentEvent[]>;
  setNextCharge(id: string, newDate: Date, logs: IPaymentLogs): Promise<void>;
}
