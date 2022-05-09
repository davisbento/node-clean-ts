import { IuguProvider } from '@/infra/iugu/implementations/IuguProvider';

import { SubscriptionSyncController } from '../controllers/SubscriptionSyncController';
import { SubscriptionSyncUseCase } from '../usecases/SubscriptionSyncUseCase';
import { makeSubscriptionDb } from './SubscriptionDbFactory';

export const makeSubscriptionSyncController = () => {
  const subscriptionRepository = makeSubscriptionDb();
  const iuguProvider = new IuguProvider();
  const subscriptionSyncUseCase = new SubscriptionSyncUseCase(subscriptionRepository, iuguProvider);
  const subscriptionSyncController = new SubscriptionSyncController(subscriptionSyncUseCase);

  return subscriptionSyncController;
};
