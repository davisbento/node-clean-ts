import { ICreateStrategy, IStrategy, IStrategyWithoutRevenues } from '@/interfaces/IStrategy';

export interface IStrategyRepository {
  getById(id: string): Promise<IStrategy>;
  getByIdWithoutRevenues(id: string): Promise<IStrategyWithoutRevenues>;
  getAll(): Promise<IStrategy[]>;
  getAllIncludingInactives(): Promise<IStrategy[]>;
  updateStrategy(id: string, strategy: Partial<IStrategy>): Promise<IStrategy>;
  createStrategy(params: ICreateStrategy): Promise<IStrategy>;
}
