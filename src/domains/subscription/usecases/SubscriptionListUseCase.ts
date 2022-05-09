import { ISubscriptionList } from '@/interfaces/ISubscription';
import { ISubscriptionRepository } from '@/repositories/ISubscriptionRepository';

export class SubscriptionListUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  public getAll(): Promise<ISubscriptionList[]> {
    return this.subscriptionRepository.getAllShowOnPage();
  }
}
