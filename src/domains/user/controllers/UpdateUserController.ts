import { IController } from '@/interfaces/IController';
import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';

import { UpdateUserUseCase } from '../usecases/UpdateUserUseCase';

export class UpdateUserController implements IController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.updateUserUseCase.updateUser(request.userId, request.body);

    return {
      data,
      statusCode: 200
    };
  }
}
