import { Strategy } from '@/entities/Strategy';
import { DbStrategyRepository } from '@/repositories/implementations/DbStrategyRepository';

export const makeStrategyDb = () => {
  const strategyRepository = new DbStrategyRepository(Strategy);

  return strategyRepository;
};
