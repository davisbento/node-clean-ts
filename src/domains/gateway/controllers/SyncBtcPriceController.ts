import { IController } from '@/interfaces/IController';

import { SyncBtcPriceUseCase } from '../usecases/SyncBtcPriceUseCase';

export class SyncBtcPriceController implements IController {
  constructor(private syncBtcPriceUseCase: SyncBtcPriceUseCase) {}

  public async handle() {
    await this.syncBtcPriceUseCase.syncBtcPrice();

    return {
      data: { ok: true },
      statusCode: 200
    };
  }
}
