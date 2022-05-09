import { IController } from '@/interfaces/IController';
import { IHttpRequest } from '@/interfaces/IHttp';

import { ConfirmEmailUseCase } from '../usecases/ConfirmEmailUseCase';

export class ConfirmEmailController implements IController {
  constructor(private confirmEmailUseCase: ConfirmEmailUseCase) {}

  public async handle(request: IHttpRequest) {
    await this.confirmEmailUseCase.confirmEmail(request.body);

    return {
      statusCode: 200,
      data: 'E-mail confirmed successfully'
    };
  }
}
