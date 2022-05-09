import { IIuguProvider } from '@/infra/iugu/IIuguProvider';
import { ICreatePlan } from '@/interfaces/IIugu';
import { ISubscriptionRepository } from '@/repositories/ISubscriptionRepository';

export class SubscriptionSyncUseCase {
  constructor(private subscriptionRepository: ISubscriptionRepository, private iuiProvider: IIuguProvider) {}

  public async syncPlans(): Promise<void> {
    const subscriptions = await this.subscriptionRepository.getAll();

    for (const subscription of subscriptions) {
      const model: ICreatePlan = {
        value_cents: subscription.value * 100,
        interval_type: 'months',
        interval: this.getFrequencyInMonths(subscription.frequency),
        identifier: subscription.id,
        name: subscription.name
      };

      await this.iuiProvider.createPlan(model);
    }

    return;
  }

  private getFrequencyInMonths(frequency: string): number {
    switch (frequency) {
      case 'monthly':
        return 1;
      case 'quarterly':
        return 3;
      case 'biannual':
        return 6;
      case 'annual':
        return 12;
      default:
        return 0;
    }
  }
}
