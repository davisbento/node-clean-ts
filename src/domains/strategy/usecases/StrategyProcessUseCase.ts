import { BotAuthenticateUseCase } from '@/domains/bot/usecases/BotAuthenticateUseCase';
import { IApiProvider } from '@/infra/api/IApiProvider';
import { EnCurrency } from '@/interfaces/ICurrency';
import { IStrategyProcess } from '@/interfaces/IStrategy';
import { IStrategyRepository } from '@/repositories/IStrategyRepository';

export class StrategyProcessUseCase {
  constructor(
    private strategyRepository: IStrategyRepository,
    private apiProvider: IApiProvider,
    private botAuthenticateUseCase: BotAuthenticateUseCase
  ) {}

  public async process(): Promise<void> {
    const startedAt = new Date().toISOString();
    console.log(`started at: ${startedAt}`);

    const botApiToken = await this.botAuthenticateUseCase.authenticate();

    const data = await this.apiProvider.get<IStrategyProcess[]>(
      '/strategy/withMetaData',
      { projectTag: 'klug' },
      botApiToken
    );

    if (data.length === 0) {
      console.log(`(early abort) finished at: ${new Date().toISOString()}`);
      return;
    }

    const strategies = await this.strategyRepository.getAllIncludingInactives();

    for (const item of data) {
      const findStrategy = strategies?.find(s => s.strategyId === item.strategy.id) || null;

      if (!findStrategy) {
        await this.strategyRepository.createStrategy({
          strategyId: item.strategy.id,
          name: item.strategy.name,
          totalInvestedAmount: item.totalInvestedAmount,
          totalUsersUsingThisStrategy: item.totalUsersUsingThisStrategy,
          strategyStatus: item.strategy.strategyStatus,
          minUsdInvestment: item.strategy.minUsdInvestment,
          totalProfit: item.totalPercentageRevenue,
          revenueGoupedByMonth: item.revenueGoupedByMonthDTOS
        });

        continue;
      }

      await this.strategyRepository.updateStrategy(findStrategy._id, {
        totalInvestedAmount: item.totalInvestedAmount,
        totalUsersUsingThisStrategy: item.totalUsersUsingThisStrategy,
        strategyStatus: item.strategy.strategyStatus,
        minUsdInvestment: item.strategy.minUsdInvestment,
        usdMarginLimit: 9999999,
        totalProfit: item.totalPercentageRevenue,
        revenueGoupedByMonth: item.revenueGoupedByMonthDTOS,
        currency: EnCurrency.BTC
      });
    }

    console.log(`finished at: ${new Date().toISOString()}`);
    return;
  }
}
