import { IHttpRequest, IHttpResponse } from '@/interfaces/IHttp';
import { GetProfileUseCase } from '../usecases/GetProfileUseCase';
import { IController } from '@/interfaces/IController';

export class GetProfileController implements IController {
  constructor(private getProfileUseCase: GetProfileUseCase) {}

  public async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const data = await this.getProfileUseCase.getProfile(request.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
