import { SubscriptionListController } from '../controllers/SubscriptionListController';
import { SubscriptionListUseCase } from '../usecases/SubscriptionListUseCase';
import { makeSubscriptionDb } from './SubscriptionDbFactory';

export const makeSubscriptionListController = () => {
  const subscriptionRepository = makeSubscriptionDb();
  const subscriptionListUseCase = new SubscriptionListUseCase(subscriptionRepository);
  const subscriptionListController = new SubscriptionListController(subscriptionListUseCase);

  return subscriptionListController;
};
