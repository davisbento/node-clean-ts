import { StrategyFindController } from '../controllers/StrategyFindController';
import { StrategyFindUseCase } from '../usecases/StrategyFindUseCase';
import { makeStrategyDb } from './StrategyDbFactory';

export const makeStrategyFindController = () => {
  const strategyRepository = makeStrategyDb();
  const strategyFindUseCase = new StrategyFindUseCase(strategyRepository);
  const strategyFindController = new StrategyFindController(strategyFindUseCase);

  return strategyFindController;
};
