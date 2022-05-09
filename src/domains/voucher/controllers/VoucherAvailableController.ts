import { IController } from '@/interfaces/IController';
import { IHttpRequest } from '@/interfaces/IHttp';

import { GetVouchersAvaiableUseCase } from '../usecases/VoucherAvailableUseCase';

export class VoucherAvaiableController implements IController {
  constructor(private getVouchersAvaiableUseCase: GetVouchersAvaiableUseCase) {}

  public async handle(httpRequest: IHttpRequest) {
    const data = await this.getVouchersAvaiableUseCase.getAvailables(httpRequest.userId);

    return {
      data,
      statusCode: 200
    };
  }
}
