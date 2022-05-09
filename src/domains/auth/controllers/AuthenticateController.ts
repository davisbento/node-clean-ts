import { IHttpRequest } from '@/interfaces/IHttp';
import { AuthenticateUseCase } from '../usecases/AuthenticateUseCase';
import { IController } from '@/interfaces/IController';

export class AuthenticateController implements IController {
  constructor(private authenticateUseCase: AuthenticateUseCase) {}

  public async handle(request: IHttpRequest) {
    const data = await this.authenticateUseCase.authenticate(request.body);

    return {
      statusCode: 200,
      data
    };
  }
}
