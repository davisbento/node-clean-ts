import { IController } from '@/interfaces/IController';
import { IHttpResponse } from '@/interfaces/IHttp';

import { NewAddresUseCase } from '../usecases/NewAddressUseCase';

export class NewAddressController implements IController {
  constructor(private readonly newAddressUseCase: NewAddresUseCase) {}

  public async handle(): Promise<IHttpResponse> {
    await this.newAddressUseCase.newAddress();

    return {
      data: { ok: true },
      statusCode: 200
    };
  }
}
