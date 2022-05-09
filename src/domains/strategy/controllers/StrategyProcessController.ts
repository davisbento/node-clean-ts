import { IController } from '@/interfaces/IController';

import { StrategyProcessUseCase } from '../usecases/StrategyProcessUseCase';

export class StrategyProcessController implements IController {
  constructor(private strategyProcessUseCase: StrategyProcessUseCase) {}

  public async handle() {
    this.strategyProcessUseCase.process();

    return {
      data: {
        ok: true
      },
      statusCode: 200
    };
  }
}
