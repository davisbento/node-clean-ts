import { Subscription } from '@/entities/Subscription';
import { DbSubscriptionRepository } from '@/repositories/implementations/DbSubscriptionRepository';

export const makeSubscriptionDb = () => {
  const subscriptionRepository = new DbSubscriptionRepository(Subscription);

  return subscriptionRepository;
};
