import { IController } from '@/interfaces/IController';
import { IHttpRequest } from '@/interfaces/IHttp';

import { SignUpUseCase } from '../usecases/SignUpUseCase';

export class SignUpController implements IController {
  constructor(private SignUpUseCase: SignUpUseCase) {}

  public async handle(request: IHttpRequest) {
    const data = await this.SignUpUseCase.SignUp(request.body);
    return {
      statusCode: 200,
      data
    };
  }
}
