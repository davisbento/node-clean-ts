import { EnChargeFrequency, IStrategyList } from '@/interfaces/IStrategy';
import { IStrategyRepository } from '@/repositories/IStrategyRepository';

export class StrategyFindUseCase {
  constructor(private strategyRepository: IStrategyRepository) {}

  public async getOne(id: string): Promise<IStrategyList> {
    const data = await this.strategyRepository.getById(id);

    if (!data) {
      return null;
    }

    return {
      id: data._id,
      name: data.name,
      totalInvestedAmount: data.totalInvestedAmount,
      totalUsersUsingThisStrategy: data.totalUsersUsingThisStrategy,
      minUsdInvestment: data.minUsdInvestment,
      commissionPercent: data.commissionPercent,
      commissionFrequency: EnChargeFrequency[data.commissionFrequency],
      membershipPrice: data.membershipPrice,
      membershipFrequency: EnChargeFrequency[data.membershipFrequency],
      currency: data.currency,
      usdMarginLimit: data.usdMarginLimit,
      totalProfit: data.totalProfit || 0,
      strategyStatus: data.strategyStatus,
      revenueGoupedByMonth: data.revenueGoupedByMonth
    };
  }
}
