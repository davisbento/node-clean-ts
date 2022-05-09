import { IController } from '@/interfaces/IController';
import { IHttpResponse } from '@/interfaces/IHttp';

import { StrategyListUseCase } from '../usecases/StrategyListUseCase';

export class StrategyListController implements IController {
  constructor(private readonly strategyListUseCase: StrategyListUseCase) {}

  public async handle(): Promise<IHttpResponse> {
    const data = await this.strategyListUseCase.getAll();

    return {
      data,
      statusCode: 200
    };
  }
}
