import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { ActiveFaUseCase } from '../usecases/ActiveFaUseCase';

export class ActiveFaController implements IController {
  constructor(private activeFaUseCase: ActiveFaUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.activeFaUseCase.activeFa(request.userId, request.body);

    return {
      data,
      statusCode: 200
    };
  }
}
