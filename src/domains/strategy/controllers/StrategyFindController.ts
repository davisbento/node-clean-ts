import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { StrategyFindUseCase } from '../usecases/StrategyFindUseCase';

export class StrategyFindController implements IController {
  constructor(private readonly strategyFindUseCase: StrategyFindUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.strategyFindUseCase.getOne(request.params.id);

    return {
      data,
      statusCode: 200
    };
  }
}
