import { IController } from '@/interfaces/IController';
import { IHttpRequest } from '@/interfaces/IHttp';

import { ForgotPasswordUseCase } from '../usecases/ForgotPasswordUseCase';

export class ForgotPasswordController implements IController {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  public async handle(request: IHttpRequest) {
    const data = await this.forgotPasswordUseCase.forgotPassword(request.body);
    return {
      statusCode: 200,
      data
    };
  }
}
