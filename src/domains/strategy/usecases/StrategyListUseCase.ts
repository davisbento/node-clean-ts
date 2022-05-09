import { EnChargeFrequency, IStrategyList } from '@/interfaces/IStrategy';
import { IStrategyRepository } from '@/repositories/IStrategyRepository';

export class StrategyListUseCase {
  constructor(private strategyRepository: IStrategyRepository) {}

  public async getAll(): Promise<IStrategyList[]> {
    const data = await this.strategyRepository.getAll();

    if (data.length === 0) {
      return [];
    }

    return data.map(item => ({
      id: item._id,
      name: item.name,
      totalInvestedAmount: item.totalInvestedAmount,
      totalUsersUsingThisStrategy: item.totalUsersUsingThisStrategy,
      commissionPercent: item.commissionPercent,
      commissionFrequency: EnChargeFrequency[item.commissionFrequency],
      membershipPrice: item.membershipPrice,
      membershipFrequency: EnChargeFrequency[item.membershipFrequency],
      currency: item.currency,
      usdMarginLimit: item.usdMarginLimit,
      minUsdInvestment: item.minUsdInvestment,
      strategyStatus: item.strategyStatus,
      totalProfit: item.totalProfit || 0,
      revenueGoupedByMonth: item.revenueGoupedByMonth
    }));
  }
}
