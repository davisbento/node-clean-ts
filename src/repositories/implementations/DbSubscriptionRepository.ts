import { Subscription } from '@/entities/Subscription';
import { EnChargeFrequency } from '@/interfaces/IStrategy';
import { ISubscription, ISubscriptionList } from '@/interfaces/ISubscription';

import { ISubscriptionRepository } from '../ISubscriptionRepository';

export class DbSubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly subscriptionModel: typeof Subscription) {}

  public getById(id: string): Promise<ISubscription> {
    return this.subscriptionModel.findById(id);
  }

  public async getAllShowOnPage(): Promise<ISubscriptionList[]> {
    const data: ISubscription[] = await this.subscriptionModel.find({ showOnPage: true }, {}, { sort: { value: 1 } });

    return data.map(item => ({
      id: item._id,
      name: item.name,
      currency: item.currency,
      value: item.value,
      oldValue: item.oldValue || 0,
      description: item?.description || [],
      frequency: EnChargeFrequency[item.frequency]
    }));
  }

  public async getAll(): Promise<ISubscriptionList[]> {
    const data: ISubscription[] = await this.subscriptionModel.find({}, {}, { sort: { value: 1 } });

    return data.map(item => ({
      id: item._id,
      name: item.name,
      currency: item.currency,
      value: item.value,
      oldValue: item.oldValue || 0,
      description: item?.description || [],
      frequency: EnChargeFrequency[item.frequency]
    }));
  }
}
