import { Strategy } from '@/entities/Strategy';
import { ICreateStrategy, IStrategy, IStrategyWithoutRevenues } from '@/interfaces/IStrategy';

import { IStrategyRepository } from '../IStrategyRepository';

export class DbStrategyRepository implements IStrategyRepository {
  constructor(private readonly strategyModel: typeof Strategy) {}

  public async getAll(): Promise<IStrategy[]> {
    return this.strategyModel.find({ showOnMarketplace: true, deleted: false }, {});
  }

  public async getAllIncludingInactives(): Promise<IStrategy[]> {
    return this.strategyModel.find();
  }

  public async getByIdWithoutRevenues(id: string): Promise<IStrategyWithoutRevenues> {
    return this.strategyModel.findById(id, { revenueGoupedByMonth: 0 });
  }

  public async getById(id: string): Promise<IStrategy> {
    return this.strategyModel.findById(id);
  }

  public async updateStrategy(id: string, strategy: Partial<IStrategy>) {
    return this.strategyModel.findByIdAndUpdate(id, { ...strategy });
  }

  public async createStrategy(params: ICreateStrategy): Promise<IStrategy> {
    const strategy = new Strategy({ ...params });

    const response = await strategy.save();

    return response;
  }
}
