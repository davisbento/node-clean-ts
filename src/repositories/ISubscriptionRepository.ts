import { ISubscription, ISubscriptionList } from '@/interfaces/ISubscription';

export interface ISubscriptionRepository {
  getAll(): Promise<ISubscriptionList[]>;
  getAllShowOnPage(): Promise<ISubscriptionList[]>;
  getById(id: string): Promise<ISubscription>;
}
