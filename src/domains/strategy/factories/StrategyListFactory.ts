import { StrategyListController } from '../controllers/StrategyListController';
import { StrategyListUseCase } from '../usecases/StrategyListUseCase';
import { makeStrategyDb } from './StrategyDbFactory';

export const makeStrategyListController = () => {
  const strategyRepository = makeStrategyDb();
  const strategyListUseCase = new StrategyListUseCase(strategyRepository);
  const strategyListController = new StrategyListController(strategyListUseCase);

  return strategyListController;
};
