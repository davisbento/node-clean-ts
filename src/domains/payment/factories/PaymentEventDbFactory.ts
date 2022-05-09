import { PaymentEvent } from '@/entities/PaymentEvent';
import { DbPaymentEventRepository } from '@/repositories/implementations/DbPaymentEventRepository';

export const makePaymentEventDb = () => {
  const paymentEventRepository = new DbPaymentEventRepository(PaymentEvent);

  return paymentEventRepository;
};
